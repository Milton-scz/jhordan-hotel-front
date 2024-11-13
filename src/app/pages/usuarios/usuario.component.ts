import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { Apollo } from 'apollo-angular';
import { getAllUsers } from 'src/app/graphql/users/graphql.queries';
import { deleteUser } from 'src/app/graphql/users/graphql.mutation';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [ CommonModule,MaterialModule,RouterModule],
  templateUrl: './usuario.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UsuarioComponent {
  users: User[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private apollo: Apollo) { }
  // Lista de usuarios simulada

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllUsers,
      })
      .valueChanges.subscribe((result: any) => {
        this.users = result?.data?.getAllUsers;
        console.log(this.users);
      });
    }



  deleteUser(id: number): void {
    this.apollo.mutate({
      mutation: deleteUser,
      variables: {
        id:id,
      }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deleteUser==true) {
          console.log(response);
          this.successMessage = 'Cliente eliminado con éxito!';
          this.errorMessage = null;
          this.users = this.users.filter(user => user.id !==id);
        } else {
          console.log(response);
          this.errorMessage = 'Error al eliminar el usuario. Por favor, intente nuevamente.';
          this.successMessage = null;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el usuario. Por favor, intente nuevamente.';
        this.successMessage = null;
        console.error('Error:', error);
      }
    });
  }
}
