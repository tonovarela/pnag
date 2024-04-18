import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import { OportunidadService } from '../../services/oportunidad.service';
import { Estado } from '../../interfaces/estados.interface';
import { Oportunidad } from '../../interfaces/OportunidadesResponse.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent extends BaseGridComponent implements OnInit {

  oportunidades = signal<Oportunidad[]>([]);
  oportunidadService = inject(OportunidadService);

  estados: Estado[] = [
    { id: '1', descripcion: 'Pendiente' },
    { id: '2', descripcion: 'Liberado' },
    { id: '3', descripcion: 'Entregado' }];

  ngOnInit(): void {
    this.iniciarResizeGrid(500);
    this.oportunidadService.listar().subscribe((response) =>{
      const oportunidades= response.oportunidades.map((oportunidad: Oportunidad) => {
        oportunidad.siguientesEstados= this.obtenerSiguienteEstado(oportunidad.id_estado);
        return oportunidad;
      });
      this.oportunidades.set(oportunidades)

    });
  }

  cambioEstatus(id_oportunidad:string,e:string){    
    this.oportunidades.update((oportunidades:Oportunidad[])=>{
      oportunidades.map(oportunidad => {
        if (oportunidad.id_oportunidad === id_oportunidad){
          oportunidad.id_estado = e;
          oportunidad.siguientesEstados = this.obtenerSiguienteEstado(oportunidad.id_estado);
        }       
        return oportunidad;
      });       

      
    this.grid.refresh();      

      return oportunidades;
    })        
  }



  obtenerSiguienteEstado(id_estado:string){
    console.log(id_estado);
    let estado :Estado []=[];
    if (id_estado === '1'){
      estado=this.estados.filter(x=>["1","2"].includes(x.id));
    }
    if (id_estado === '2' ){      
      estado=this.estados.filter(x=>["3","2"].includes(x.id));
    }     
    if (id_estado === '3' ){
      estado=this.estados.filter(x=>x.id==='3');
    }    
    return estado;

  }

}
