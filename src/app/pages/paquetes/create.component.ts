import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createPaquete } from 'src/app/graphql/paquetes/graphql.mutation';  // Asegúrate de que esta mutation esté definida
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-paquete',
  templateUrl: './create.component.html',
  standalone: true,
  imports: [RouterModule, MaterialModule, CommonModule, ReactiveFormsModule],
})
export class CrearPaqueteComponent implements OnInit {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private apollo: Apollo) {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      detalle: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(0)]),


    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const { nombre, detalle, precio} = this.form.value;
      const paquete = { nombre, detalle, precio};

      this.createPaquete(paquete);
    }
  }

  createPaquete(paquete: { nombre: string, detalle: string, precio: number }): void {
    this.apollo.mutate({
      mutation: createPaquete,  // Asegúrate de que esta mutation esté definida
      variables: { paquete }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Paquete creado con éxito!';
        this.errorMessage = null;

        setTimeout(() => {
          this.successMessage = null;  // Limpiar el mensaje de éxito después de 5 segundos
        }, 5000);
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el paquete. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
