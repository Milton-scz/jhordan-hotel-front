import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Obtiene el token de localStorage
    const token = localStorage.getItem('accessToken');

    // Verifica si el token está presente y aún no ha expirado
    if (token) {
      const tokenExpiration = this.getTokenExpiration(token);
      const now = new Date();

      if (tokenExpiration && tokenExpiration > now) {
        // Token válido, clona la solicitud original y agrega el token como encabezado de autorización
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next.handle(authReq);
      } else {
        // Token vencido, borra el token del almacenamiento local y redirige a la página de inicio de sesión
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login']);
        return throwError('Token expirado');
      }
    }

    // Si no hay token disponible, simplemente pasa la solicitud original sin modificarla
    return next.handle(req);
  }

  // Método para obtener la fecha de expiración del token
  private getTokenExpiration(token: string): Date | null {
    try {
      const jwt = JSON.parse(atob(token.split('.')[1]));
      return jwt && jwt.exp ? new Date(jwt.exp * 1000) : null;
    } catch (error) {
      return null;
    }
  }
}
