import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaPaquetes } from 'src/app/graphql/paquetes/graphql.queries';
import { deletePaquete } from 'src/app/graphql/paquetes/graphql.mutation';
import { Paquete } from 'src/app/model/paquete';  // Modelo para el paquete
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-paquete',
  templateUrl: './paquete.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class PaqueteComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  paquetes: Paquete[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apollo.watchQuery({
      query: listaPaquetes,
      variables: {
        page: this.paginaActual,
        size: this.pageSize,
      },
    })
    .valueChanges.subscribe((result: any) => {
      console.log(result);
      this.paquetes = result?.data?.getPaquetes?.items || [];
      this.pageInfo = result?.data?.getPaquetes?.pageInfo || {};
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }

  deletePaquete(id: number): void {
    this.apollo.mutate({
      mutation: deletePaquete,
      variables: { id },
    }).subscribe({
      next: (response: any) => {
        if (response.data.deletePaquete === true) {
          console.log('Paquete eliminado:', response);
          this.successMessage = 'Paquete eliminado con éxito!';
          this.paquetes = this.paquetes.filter(paquete => paquete.paqueteId !== id);
        } else {
          this.errorMessage = 'Error al eliminar el paquete. Por favor, intente nuevamente.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el paquete. Por favor, intente nuevamente.';
        console.error('Error:', error);
      },
    });
  }
}
