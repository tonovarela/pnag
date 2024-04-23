import { Injectable, computed, inject, signal } from '@angular/core';
import { Rol, StatusLogin, Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { ResponseAuth } from '../interfaces/responseAuth.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario = signal<Usuario | undefined>(undefined);
  private urlAPI = environment.apiUrl;
  private http = inject(HttpClient);
  public statusLogin = signal<StatusLogin>(StatusLogin.INITIAL);
  constructor() { }

  usuarioLogueado= computed(() => {
    return {id:this.usuario()?.id || "0",nombre:this.usuario()?.nombre || "--",rol:this.usuario()?.rol || "0"};
  })

  
  setUsuarioDesarrollo(){
    this.statusLogin.set(StatusLogin.PROCESSING);    
    this.usuario.set({id:"2801",nombre:"mestelles",rol:Rol.ADMINISTRADOR});
    this.statusLogin.set(StatusLogin.LOGGED);
  }

  login(login: string, password: string) {
        
    return firstValueFrom(this.http.post<ResponseAuth>(this.urlAPI + "/auth/login", { login, password }).pipe(
      map((response: ResponseAuth) => {                        
         const {usuario} = response;
        this.usuario.set({ id:usuario.id_usuario, nombre: usuario.login ,rol:usuario.rol});
        return response;
      
      })
    ))
  }


  



}
