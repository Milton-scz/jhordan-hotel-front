import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { authenticateUser } from 'src/app/graphql/users/graphql.mutation';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, private apollo: Apollo) {}

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const { uname, password } = this.form.value;
    localStorage.clear();
    this.authenticate(uname!, password!);
  }

  authenticate(email: string, password: string): void {
    console.log(email, password);

    this.apollo
      .mutate({
        mutation: authenticateUser,
        variables: {
          email,
          password,
        },
      })
      .subscribe({
        next: (response: any) => {
          this.successMessage = '¡Login exitoso!';
          this.errorMessage = null;
          const token = response.data.login;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('accessToken', token);
            console.log('localStorage está disponible');
          } else {
            console.error('localStorage no está disponible');
          }

          console.log('Token:', token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Error, intente nuevamente.';
          this.successMessage = null;
          console.error('Error:', error);
        },
      });
  }
}
