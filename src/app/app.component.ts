import { Component, inject ,effect, computed} from '@angular/core';
import { UiService } from './services/ui.service';
import { UsuarioService } from './services/usuario.service';
import { StatusLogin } from './interfaces/usuario.interface';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  appName = environment.appName;
  usuarioService = inject(UsuarioService);
  uiService = inject(UiService);
  effectRef:any;

  constructor() {
    this.effectRef = effect(() => {
      
      switch (this.usuarioService.statusLogin()) {
        case StatusLogin.LOGOUT:
          this.salirApp();
          break;
          
        case StatusLogin.ERROR:          
          this.uiService.mostrarAlertaError(this.appName, "Login incorrecto");
          this.salirApp();
          break;
      }

    }, {
      allowSignalWrites: true
    })
  }

  ngOnInit(): void {
    this.verificarLogin();
  }


  salirApp() {
    
    const esProduccion = environment.production;
    if (esProduccion) {
      window.location.href = "/litoapps";
      localStorage.removeItem("User");
      localStorage.removeItem("Pass");
      return;
    }
  }

  
  statusLogin = computed(() => {
    return this.usuarioService.statusLogin();
  })


  async verificarLogin() {
    const user = localStorage.getItem("User");
    const password = localStorage.getItem("Pass");                

    this.usuarioService.statusLogin.set(StatusLogin.INITIAL);      
    
    if (!environment.production){
        this.usuarioService.setUsuarioDesarrollo();        
        return;
    }
    if (!(user != null && password != null)) {      
      this.usuarioService.statusLogin.set(StatusLogin.ERROR);      
      return;
    }    
    try {          
       await this.usuarioService.login(user, password);      
    } catch (error) {      
      this.usuarioService.statusLogin.set(StatusLogin.ERROR);
    }

  }

}
