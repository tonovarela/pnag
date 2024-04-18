import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { StatusLogin } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-sidebar',

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  usuarioService = inject(UsuarioService);
  cerrarSesion() {
    console.log("Cerro")
    this.usuarioService.statusLogin.set(StatusLogin.LOGOUT);
  }
}
