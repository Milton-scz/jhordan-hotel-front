import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { getAllDevices } from 'src/app/graphql/devices/graphql.queries';
import { getAllHabitaciones } from 'src/app/graphql/habitaciones/graphql.queries';
import { MaterialModule } from 'src/app/material.module';
import { Device, OcupadoDisponible } from 'src/app/model/device';
import { createHabitacion } from 'src/app/graphql/habitaciones/graphql.mutation';
import { Status, Tipo } from 'src/app/model/habitacion';

@Component({
  selector: 'app-crear-habitacion',
  templateUrl: './create.component.html',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule, ReactiveFormsModule],
})
export class CrearHabitacionComponent implements OnInit {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  devices: Device[] = [];
  habitaciones: any[] = [];
  selectedDevice: Device | null = null;

  constructor(private apollo: Apollo) {
    this.form = new FormGroup({
      numeroHabitacion: new FormControl('', [Validators.required]),
      capacidad: new FormControl('', [Validators.required, Validators.min(1)]),
      detalles: new FormControl('', [Validators.required]),
      precioPorNoche: new FormControl('', [Validators.required, Validators.min(0)]),
      estado: new FormControl('DISPONIBLE', [Validators.required]),
      tipo: new FormControl('SIMPLE', [Validators.required]),
      device: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apollo.watchQuery({
      query: getAllHabitaciones,
    }).valueChanges.subscribe((result: any) => {
      this.habitaciones = result?.data?.getAllHabitaciones || [];
      this.loadDevices();
    });
  }

  loadDevices(): void {
    this.apollo.watchQuery({
      query: getAllDevices,
    }).valueChanges.subscribe((result: any) => {
      this.devices = (result?.data?.getAllDevices || []).filter((device: Device) => device.ocupadoDisponible === OcupadoDisponible.DISPONIBLE);
    });
  }


  onSubmit(): void {
    if (this.form.valid && this.selectedDevice) {
      const { numeroHabitacion, capacidad, detalles, precioPorNoche, estado, tipo } = this.form.value;
      const { __typename, ...deviceWithoutTypename } = this.selectedDevice as any;

      const habitacion = {
        numeroHabitacion,
        capacidad,
        detalles,
        precioPorNoche,
        estado,
        tipo,
        device: {
          ...deviceWithoutTypename,
          ocupadoDisponible: OcupadoDisponible.OCUPADO
        }
      };

      this.createHabitacion(habitacion);
    }
  }




  onTipoChange(): void {
    const selectedDeviceId = this.form.get('device')?.value;
    this.selectedDevice = this.devices.find(device => device.id === selectedDeviceId) || null;
  }

  createHabitacion(habitacion: { numeroHabitacion: number, capacidad: number, detalles: string, precioPorNoche: number, estado: Status, tipo: Tipo, device: Device }): void {
    this.apollo.mutate({
      mutation: createHabitacion,
      variables: { habitacion }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Habitación creada con éxito!';
        this.errorMessage = null;
        this.form.reset({ estado: 'DISPONIBLE', tipo: 'SIMPLE' });
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear la habitación. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
