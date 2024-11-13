import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaHabitaciones } from 'src/app/graphql/habitaciones/graphql.queries';
import { deleteHabitacion } from 'src/app/graphql/habitaciones/graphql.mutation';
import { Habitacion } from 'src/app/model/habitacion';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class HabitacionComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  habitaciones: Habitacion[] = [];  // Arreglo para almacenar las habitaciones
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apollo.watchQuery({
      query: listaHabitaciones,  // Asegúrate de que esta query esté definida correctamente en tus queries
      variables: {
        page: this.paginaActual,
        size: this.pageSize,
      },
    }).valueChanges.subscribe((result: any) => {
      console.log(result);
      this.habitaciones = result?.data?.getHabitaciones?.items || [];
      this.pageInfo = result?.data?.getHabitaciones?.pageInfo || {};
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }

  deleteHabitacion(id: number): void {
    this.apollo.mutate({
      mutation: deleteHabitacion,  // Asegúrate de tener esta mutation definida
      variables: { id },
    }).subscribe({
      next: (response: any) => {
        if (response.data.deleteHabitacion === true) {
          console.log('Habitación eliminada:', response);
          this.successMessage = 'Habitación eliminada con éxito!';
          this.habitaciones = this.habitaciones.filter((habitacion) => habitacion.id !== id);
        } else {
          this.errorMessage = 'Error al eliminar la habitación. Por favor, intente nuevamente.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar la habitación. Por favor, intente nuevamente.';
        console.error('Error:', error);
      },
    });
  }
}
