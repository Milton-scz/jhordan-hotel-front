import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { createRecepcion } from 'src/app/graphql/recepcion/graphql.mutation';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Habitacion } from 'src/app/model/habitacion';
import { getAllUsers } from 'src/app/graphql/users/graphql.queries';
import { getAllHabitaciones } from 'src/app/graphql/habitaciones/graphql.queries';
import { CommonModule } from '@angular/common';
import { getAllPaquetes } from 'src/app/graphql/paquetes/graphql.queries';
import { User } from 'src/app/model/user';
import { Paquete } from 'src/app/model/paquete';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-crear-recepcion',
  templateUrl: './create.component.html',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule, ReactiveFormsModule],
})
export class CrearRecepcionComponent implements OnInit {
  form: FormGroup;
  users: any[] = [];
  paquetes: any[] = [];
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
      precioHabitacion: new FormControl(0, [Validators.required]),
      cedula: new FormControl(User, [Validators.required]),
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
    this.loadDataUsers();
    this.loadDataPaquetes();
  }

  loadDataUsers(): void {
    this.apollo
      .watchQuery({
        query: getAllUsers,
      })
      .valueChanges.subscribe((result: any) => {
        this.users = result?.data?.getAllUsers;
      });
  }

  loadDataPaquetes(): void {
    this.apollo
      .watchQuery({
        query: getAllPaquetes,
      })
      .valueChanges.subscribe((result: any) => {
        this.paquetes = result?.data?.getAllPaquetes;
      });
  }

  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllHabitaciones,
      })
      .valueChanges.subscribe((result: any) => {
        this.habitaciones = result?.data?.getAllHabitaciones || [];
        const foundHabitacion = this.habitaciones.find((habitacion: Habitacion) => habitacion.id == this.habitacionId);
        if (foundHabitacion) {
          this.habitacion = foundHabitacion;
          this.form.patchValue({
            numeroHabitacion: this.habitacion.numeroHabitacion,
            tipoHabitacion: this.habitacion.tipo,
            descripcionHabitacion: this.habitacion.detalles,
            estadoHabitacion: this.habitacion.estado,
            precioHabitacion: this.habitacion.precioPorNoche,
          });
        } else {
          console.error('Habitación no encontrada');
        }
      });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const numeroHabitacion = this.form.get('numeroHabitacion')?.value;
      const cedula = this.form.get('cedula')?.value;
      const paqueteId = this.form.get('paqueteId')?.value;
      const fechaEntrada = this.form.get('fechaEntrada')?.value;
      const fechaSalida = this.form.get('fechaSalida')?.value;
      const adelanto = this.form.get('adelanto')?.value;
      const descuento = this.form.get('descuento')?.value;
      const totalAPagar = this.form.get('totalAPagar')?.value;
      const preferencias = this.form.get('preferencias')?.value;
      const observaciones = this.form.get('observaciones')?.value;
      const tipo = this.form.get('tipo')?.value;

      this.createRecepcion(
        numeroHabitacion, cedula, paqueteId, fechaEntrada, fechaSalida,
        adelanto, descuento, totalAPagar, preferencias, observaciones, tipo
      );
    }
  }


  createRecepcion(numeroHabitacion:number,cedula: string,paqueteId:number,fechaEntrada:string,fechaSalida:string,adelanto:number,descuento:number,totalAPagar:number,preferencias:string,observaciones:string,tipo:string): void {
    this.apollo
      .mutate({
        mutation: createRecepcion,
        variables: {
          numeroHabitacion,
          cedula,
          paqueteId,
          fechaEntrada,
          fechaSalida,
          adelanto,
          descuento,
          totalAPagar,
          preferencias,
          observaciones,
          tipo,
        }
      })
      .subscribe({
        next: (response) => {
          this.successMessage = 'Recepción creada con éxito!';
          this.errorMessage = null;
          this.form.reset();
          setTimeout(() => this.successMessage = null, 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al crear recepción. Por favor, intente nuevamente.';
          this.successMessage = null;
          console.error('Error:', error);
        }
      });
  }

  onDateChange(): void {
    const fechaEntrada = this.form.get('fechaEntrada')?.value;
    const fechaSalida = this.form.get('fechaSalida')?.value;
    const precioPorNoche = 100;

    if (fechaEntrada && fechaSalida) {
      const dateEntrada = new Date(fechaEntrada);
      const dateSalida = new Date(fechaSalida);

      if (dateSalida > dateEntrada) {
        const diffTime = Math.abs(dateSalida.getTime() - dateEntrada.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
        const totalAPagar = diffDays * precioPorNoche;
        this.form.get('totalAPagar')?.setValue(totalAPagar);
      } else {
        this.form.get('totalAPagar')?.setValue(0);
      }
    }
  }

}
