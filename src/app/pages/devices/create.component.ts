import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createDevice } from 'src/app/graphql/devices/graphql.mutation';  // Asegúrate de que esta mutation esté definida
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { OcupadoDisponible } from 'src/app/model/device';

@Component({
  selector: 'app-crear-device',
  templateUrl: './create.component.html',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule, ReactiveFormsModule],
})
export class CrearDeviceComponent implements OnInit {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apollo: Apollo) {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      uuid: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      status: new FormControl('ACTIVO', [Validators.required]),
      ocupadoDisponible: new FormControl(OcupadoDisponible.DISPONIBLE, [Validators.required])
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const { nombre, uuid, tipo, descripcion, status , ocupadoDisponible} = this.form.value;
      const device = { nombre, uuid, tipo, descripcion, status ,ocupadoDisponible};

      this.createDevice(device);
    }
  }

  createDevice(device: { nombre: string, uuid: string, tipo: string, descripcion: string, status: string, ocupadoDisponible:OcupadoDisponible }): void {
    this.apollo.mutate({
      mutation: createDevice,  // Asegúrate de que esta mutation esté definida
      variables: { device }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Dispositivo creado con éxito!';
        this.errorMessage = null;
        this.form.reset({ status: 'ACTIVO' });  // Restablecer el formulario con valores predeterminados
        setTimeout(() => {
          this.successMessage = null;  // Limpiar el mensaje de éxito después de 5 segundos
        }, 5000);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el dispositivo. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
