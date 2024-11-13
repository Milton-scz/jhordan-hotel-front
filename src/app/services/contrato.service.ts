import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {
  private apiUrl = 'https://api-smartcontract-hoteliot-lively-smoke-9157.fly.dev';

  constructor(private http: HttpClient) { }

  getContratos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/registros`);
  }



}
