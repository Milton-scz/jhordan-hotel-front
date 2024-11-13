import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { createRecepcion, updateRecepcion } from 'src/app/graphql/recepcion/graphql.mutation';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Habitacion } from 'src/app/model/habitacion';
import { getAllUsers } from 'src/app/graphql/users/graphql.queries';
import { getAllHabitaciones } from 'src/app/graphql/habitaciones/graphql.queries';
import { CommonModule } from '@angular/common';
import { getAllPaquetes } from 'src/app/graphql/paquetes/graphql.queries';
import { User } from 'src/app/model/user';
import { Paquete } from 'src/app/model/paquete';
import { MaterialModule } from 'src/app/material.module';
import { Recepcion } from 'src/app/model/recepcion';
import { getAllRecepciones } from 'src/app/graphql/recepcion/graphql.queries';

@Component({
  selector: 'app-edit-recepcion',
  templateUrl: './edit.component.html',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule, ReactiveFormsModule],
})
export class EditRecepcionComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];
  recepciones: any[] = [];
  recepcion: Recepcion | undefined;
  habitacion: Habitacion | undefined;
  habitaciones: Habitacion[] = [];
  habitacionId: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    this.form = new FormGroup({
      numeroHabitacion: new FormControl(0, [Validators.required]),
      tipoHabitacion: new FormControl(0, [Validators.required]),
      descripcionHabitacion: new FormControl(0, [Validators.required]),
      estadoHabitacion: new FormControl(0, [Validators.required]),
      precioPorNoche: new FormControl(0, [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      paqueteId: new FormControl(Paquete, [Validators.required]),
      fechaEntrada: new FormControl('', [Validators.required]),
      fechaSalida: new FormControl('', [Validators.required]),
      adelanto: new FormControl(0, [Validators.required]),
      descuento: new FormControl(0, [Validators.required]),
      totalAPagar: new FormControl(0, [Validators.required]),
      tipo: new FormControl('HOSPEDAJE', [Validators.required]),
      preferencias: new FormControl(''),
      observaciones: new FormControl(''),
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.habitacionId = +id; // Convierte el id en número
    }
    this.loadData();


  }


  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllRecepciones,
      })
      .valueChanges.subscribe((result: any) => {
        this.recepciones = result?.data?.getAllRecepciones || [];
        const foundRecepcion = this.recepciones.find((recepcion: Recepcion) => recepcion.habitacion.id == this.habitacionId && recepcion.terminado==false);
        if (foundRecepcion) {
          this.recepcion = foundRecepcion;
          this.form.patchValue({
            numeroHabitacion: this.recepcion?.habitacion.numeroHabitacion,
            telefono: this.recepcion?.user.telefono,
            nombre: this.recepcion?.user.name,
            tipoHabitacion: this.recepcion?.habitacion.tipo,
            descripcionHabitacion: this.recepcion?.habitacion.detalles,
            estadoHabitacion: this.recepcion?.habitacion.estado,
            precioPorNoche: this.recepcion?.habitacion.precioPorNoche,
            fechaEntrada: this.recepcion?.fechaEntrada,
            fechaSalida: this.recepcion?.fechaSalida,
            totalAPagar: this.recepcion?.totalAPagar,
            descuento: this.recepcion?.descuento,
            adelanto: this.recepcion?.adelanto,
            observaciones: this.recepcion?.observaciones,
          });
        } else {
          console.error('Habitación no encontrada');
        }
      });
  }

  onSubmit(): void {

    const id = this.recepcion?.id ?? 0;
      this.updateRecepcion(id);

  }


  updateRecepcion(id:number): void {
    this.apollo
      .mutate({
        mutation: updateRecepcion,
        variables: {id}
      })
      .subscribe({
        next: (response) => {
          this.successMessage = 'Recepción actualiza con éxito!';
          this.errorMessage = null;
          this.form.reset();
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar recepción. Por favor, intente nuevamente.';
          this.successMessage = null;
          console.error('Error:', error);
        }
      });
  }



}
