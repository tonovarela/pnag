import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { StatusLogin } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-header',    
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuarioService = inject(UsuarioService);
  usuarioLogueado = this.usuarioService.usuarioLogueado;

  cerrarSesion() {
   this.usuarioService.statusLogin.set(StatusLogin.LOGOUT);
  }

}
