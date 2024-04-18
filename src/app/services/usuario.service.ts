import { Injectable, computed, inject, signal } from '@angular/core';
import { Rol, StatusLogin, Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

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
    return {id:this.usuario()?.id || "0",nombre:this.usuario()?.nombre || "--"};
  })

  
  setUsuarioDesarrollo(){
    this.statusLogin.set(StatusLogin.PROCESSING);    
    this.usuario.set({id:"2801",nombre:"mestelles",rol:Rol.ADMINISTRADOR});
    this.statusLogin.set(StatusLogin.LOGGED);
  }

  login(login: string, password: string) {
    // this.statusLogin.set(StatusLogin.PROCESSING);    
    // this.usuario.set({id:"2801",nombre:"mestelles"});
    // this.statusLogin.set(StatusLogin.LOGGED);
    // return firstValueFrom(this.http.post(this.urlAPI + "/auth/login", { usuario:{login, password} }).pipe(
    //   map((response: any) => {
    //     const { data } = response;        
    //     this.usuario.set({ id: data["id_Usuario"], nombre: data["login"] });
    //     return response;
    //   })
    // ))
  }


  



}
