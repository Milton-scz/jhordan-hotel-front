import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { listaRegistros } from 'src/app/graphql/registros/graphql.queries';
import { Registro } from 'src/app/model/registro';
import { ContratoService } from 'src/app/services/contrato.service';
import { User } from 'src/app/model/user';
import { getRecepcionByUser } from 'src/app/graphql/recepcion/graphql.queries';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Recepcion } from 'src/app/model/recepcion';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class RegistroComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  registros: Registro[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;
  user: User | null = null;

  constructor(private apollo: Apollo, private contratoService: ContratoService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.contratoService.getContratos().subscribe({
      next: (data) => {
        console.log(data);
        this.registros = data;
      },
      error: (error) => {
        console.error('Error al obtener contratos', error);
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }

  enviarQr(registro: Registro): void {
    const cedula = registro.cedulaCliente;
    console.log(cedula);

    this.getRecepcion(cedula).subscribe((recepcion) => {
      if (recepcion) {
        const telefono = recepcion.user.telefono;
        const trxHash = registro.trxHash;
        const codigo_qr = `https://quickchart.io/qr?text=${telefono},${cedula},${trxHash}&ecLevel=Q&format=svg`;

        const enlace = `https://wa.me/${telefono}?text=${encodeURIComponent(codigo_qr)}`;
        window.open(enlace, '_blank');
      }
    });
  }

  getRecepcion(cedula: string): Observable<Recepcion | null> {
    return this.apollo
      .watchQuery<any>({
        query: getRecepcionByUser,
        variables: { cedula }
      })
      .valueChanges.pipe(
        map(result => {
          const recepcion = result?.data?.getRecepcionByUser;
          if (recepcion) {
            console.log(recepcion);
            return recepcion;
          } else {
            console.error('No se encontró el usuario');
            return null;
          }
        }),
        catchError(error => {
          console.error('Error al obtener el usuario:', error);
          return [null];
        })
      );
  }
}
