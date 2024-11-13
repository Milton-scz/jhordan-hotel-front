import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { listaDevices } from 'src/app/graphql/devices/graphql.queries';
import { deleteDevice } from 'src/app/graphql/devices/graphql.mutation';
import { Device } from 'src/app/model/device';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  standalone: true,
  imports: [ CommonModule,MaterialModule,RouterModule],
})
export class DeviceComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;
  devices: Device[] = [];
  pageInfo: any = {};
  pageSize: number = 10;
  paginaActual: number = 0;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.apollo.watchQuery({
      query: listaDevices,
      variables: {
        page: this.paginaActual,
        size: this.pageSize
      }
    })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      this.devices = result?.data?.getDevices?.items || [];
      this.pageInfo = result?.data?.getDevices?.pageInfo || {};
    });
  }



  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.paginaActual = event.pageIndex;
    this.loadData();
  }

  deleteDevice(id: number): void {
    this.apollo.mutate({
      mutation: deleteDevice,
      variables: { id }
    }).subscribe({
      next: (response: any) => {
        if (response.data.deleteDevice === true) {
          console.log('Device eliminada:', response);
          this.successMessage = 'eliminada con éxito!';
          this.devices = this.devices.filter(device => device.id !== id);
        } else {
          this.errorMessage = 'Error al eliminar  Por favor, intente nuevamente.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar. Por favor, intente nuevamente.';
        console.error('Error:', error);
      }
    });
  }
}
