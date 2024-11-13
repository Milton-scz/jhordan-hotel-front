import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { getAllHabitaciones } from 'src/app/graphql/habitaciones/graphql.queries';
import { Habitacion } from 'src/app/model/habitacion';
import { filter } from 'rxjs/operators';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule], // Usa RouterModule en lugar de Router
})
export class RecepcionComponent implements OnInit {

  habitaciones: Habitacion[] = [];
  private routerSub: Subscription = new Subscription();
  constructor(private apollo: Apollo, private router: Router,private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadData(); // Cargar datos al inicio

    // Suscribirse a los cambios de navegación
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url.includes('recepciones')) {
        window.location.reload();
      }
    });
  }
  loadData(): void {
    this.apollo
      .watchQuery({
        query: getAllHabitaciones,
      })
      .valueChanges.subscribe(
        (result: any) => {
          console.log(result);  // Verifica el resultado de la consulta
          this.habitaciones = result?.data?.getAllHabitaciones || [];
          this.cdr.detectChanges();  // Forzar actualización si es necesario

        },
        (error) => {
          console.error('Error al cargar las habitaciones:', error);
        }
    );

  }


  ngOnDestroy(): void {
    // Asegúrate de desuscribirte del observador cuando el componente sea destruido
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
