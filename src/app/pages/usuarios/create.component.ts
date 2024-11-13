import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { createUser } from 'src/app/graphql/users/graphql.mutation';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRole } from 'src/app/model/UserRole'; // Asegúrate de que el enum esté exportado
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';  // Importa CommonModule
@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule,CommonModule,],
  templateUrl: './create.component.html',
})
export class CrearUsuarioComponent implements OnInit {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  // Define una lista de roles válidos para el select del formulario
  roles = Object.values(UserRole);

  constructor(private apollo: Apollo) {
    // Inicialización del formulario con controles y validaciones
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) {
      const { name, cedula, telefono, direccion, email, password, role } = this.form.value;
      this.createUser(name, cedula, telefono, direccion, email, password, role);
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }

  createUser(
    name: string,
    cedula: string,
    telefono: string,
    direccion: string,
    email: string,
    password: string,
    role: UserRole
  ): void {
    this.apollo.mutate({
      mutation: createUser,
      variables: { name, cedula, telefono, direccion, email, password, role }
    }).subscribe({
      next: (response) => {
        this.successMessage = 'Usuario creado con éxito!';
        this.errorMessage = null;
        this.form.reset();
        setTimeout(() => this.successMessage = null, 3000); // Mensaje desaparece después de 3 segundos
      },
      error: (error) => {
        this.errorMessage = 'Error al crear el usuario. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
