import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { Html5Qrcode } from 'html5-qrcode';  // Asegúrate de tener esta librería instalada
import { Recepcion } from 'src/app/model/recepcion';
import { getAllRecepciones, getRecepcionByUser } from 'src/app/graphql/recepcion/graphql.queries';
import { Apollo } from 'apollo-angular';
import { catchError, map, Observable } from 'rxjs';
import { Status } from 'src/app/model/habitacion';
import { routes } from 'src/app/app.routes';

@Component({
  selector: 'app-verificar',
  templateUrl: './verificar.component.html',
  styleUrls: ['./verificar.component.scss'],
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class VerificarComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  private cedulasRegistradas = new Set<string>();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  recepciones: Recepcion[];

  constructor(private apollo: Apollo,private router: Router) {}

  ngOnInit(): void {
    this.loadData();
    this.startCamera();
  }

  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllRecepciones,
      })
      .valueChanges.subscribe(
        (result: any) => {
          console.log(result);
          this.recepciones = result?.data?.getAllRecepciones || [];


        },
        (error) => {
          console.error('Error al cargar las habitaciones:', error);
        }
    );

  }
  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (this.videoElement) {
            const video: HTMLVideoElement = this.videoElement.nativeElement;
            video.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error('Error al acceder a la cámara: ', error);
          this.errorMessage = 'No se pudo acceder a la cámara.';
        });
    } else {
      this.errorMessage = 'Tu navegador no soporta acceso a la cámara.';
    }
    this.leerCodigoQR();
  }

  leerCodigoQR(): void {
    const html5QrCode = new Html5Qrcode("camera-container");

    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        html5QrCode.start(
          cameraId,
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText, decodedResult) => {
            console.log("Código QR detectado:", decodedText);
            this.enviarDatosRecepcion(decodedText);

          },
          (errorMessage) => {

            console.log("Error al leer QR:", errorMessage);
          }
        )
        .catch((err) => {
          console.error("Error al iniciar el escaneo de QR:", err);
        });
      }
    }).catch(err => {
      console.error("Error al obtener cámaras:", err);
    });
  }

  async enviarDatosRecepcion(decodedText: string): Promise<void> {
    const partes = decodedText.split(',');
    const cedula = partes[1];
    console.log("Cédula del cliente:", cedula);

    try {
      if (this.cedulasRegistradas.has(cedula)) {
        console.log("La cédula ya está registrada. No se realizará ninguna acción.");
        return;
      }

      this.cedulasRegistradas.add(cedula);

      const recepcion = this.recepciones.find((recepcion) => recepcion.user.cedula === cedula);

      if (recepcion) {
        console.log("Datos de recepción obtenidos:", recepcion);
        if (recepcion.habitacion.estado == Status.DISPONIBLE) {
          console.log("La habitación está disponible.");

        } else {
          const route = `recepciones/edit-recepcion/${recepcion.habitacion.id}`;
          console.log("Redirigiendo a la ruta:", route);
          await this.router.navigate([route]);
        }
      } else {
        console.error("No se encontró la recepción para la cédula proporcionada.");
      }
    } catch (error) {
      console.error("Error al obtener los datos de recepción:", error);
    }
  }


  async getRecepcion(cedula: string): Promise<Recepcion | null> {
    try {
      const result = await this.apollo
        .watchQuery<any>({
          query: getRecepcionByUser,
          variables: { cedula }
        })
        .valueChanges
        .toPromise();

      const recepcion = result?.data?.getRecepcionByUser;

      if (recepcion) {
        if (recepcion.habitacion.estado === Status.DISPONIBLE) {
          return recepcion;
        } else {
          const route = `edit-recepcion/${recepcion.habitacion.id}`;
          console.log("Redirigiendo a la ruta:", route);
          this.router.navigate([route]);
          return null;
        }
      } else {
        console.error('No se encontró el usuario');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }


}
