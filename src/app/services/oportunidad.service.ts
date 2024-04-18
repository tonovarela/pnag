import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { OportunidadesResponse } from '../interfaces/OportunidadesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class OportunidadService {
  apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  constructor() { }

  listar() {

    return this.http.get<OportunidadesResponse>(this.apiUrl + "/oportunidad");

  }
}
