import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { OportunidadesResponse, Oportunidad } from '../interfaces/oportunidadesResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class OportunidadService {
  apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  constructor() { }

  listar(pendientes: boolean = false) {    
    return this.http.get<OportunidadesResponse>(this.apiUrl + `/oportunidad?pendientes=${pendientes}`);
  }
  actualizarEstatus(oportunidad:Partial<Oportunidad>){
    return this.http.put(this.apiUrl+"/oportunidad/estatus",{oportunidad})
  }
}
