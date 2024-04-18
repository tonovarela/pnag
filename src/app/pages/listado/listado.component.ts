import { Component, effect, EffectRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import { OportunidadService } from '../../services/oportunidad.service';
import { Estado } from '../../interfaces/estados.interface';
import { Oportunidad } from '../../interfaces/oportunidadesResponse.interface';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { cuerpoMarbete } from '../../marbete/marbete.print';
import { Marbete } from '../../interfaces/marbete.interface';

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-Italic.ttf'
  }
}

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent extends BaseGridComponent implements OnInit,OnDestroy {

  oportunidades = signal<Oportunidad[]>([]);
  oportunidadService = inject(OportunidadService);
  pendientes = signal(true);

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.effectRef.destroy();
    
  }

  constructor() {
    super();
    this.effectRef= effect(()=>{      
      this.cargarInfo(this.pendientes());
    })
  }
  estados: Estado[] = [];
    effectRef :EffectRef ;

  ngOnInit(): void {    
    this.autoFitColumns = false;
    this.iniciarResizeGrid(300);
    this.pendientes.set(true);

  }


  private cargarInfo(pendientes:boolean){    
    this.oportunidadService.listar(pendientes).subscribe((response) =>{
      this.estados= response.estados;
      const oportunidades= response.oportunidades.map((oportunidad: Oportunidad) => {
        oportunidad.siguientesEstados= this.obtenerSiguienteEstado(oportunidad.id_estado);
        return oportunidad;
      });
      this.oportunidades.set(oportunidades)

    });
  }

  cambioEstatus(oportunidad:Oportunidad){    

const { 
  id_oportunidad,
  id_estado,    
  nombreOportunidad,  
  id_cliente,  
  nombreCliente,       
} = oportunidad;
 

 const o ={ 
  id_oportunidad,
  id_estado,    
  nombre:nombreOportunidad,  
  id_cliente,  
  nombreCliente,       
} ;
   
    this.oportunidadService.actualizarEstatus(o).subscribe(_=>this.cargarInfo(this.pendientes()))

    
  }


  tooglePendientes(){
    const t = !this.pendientes();    
    this.pendientes.set(t);
  }


  obtenerSiguienteEstado(id_estado:string){    
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

   imprimirMarbete(oportunidad: Oportunidad){
    const marbete:Marbete ={
      id_oportunidad: oportunidad.id_oportunidad! ,
      identificador: 'MUESRTRA',
      cantidad: 15,
      inventario: 15,
      fechaIngreso: '',
      entrego: '',
      descripcion: oportunidad.nombreOportunidad,
      nota: '-----',
      unidad: '',
      vendedor: '---',
      responsable: oportunidad.nombreCliente,
      fechaSalida: '--',
      fechaVencimiento: '---',
      sku: oportunidad.nombreOportunidad,
      codigoFormato: '',
      instruccionesImpresion: '',
      componente: oportunidad.nombreOportunidad,
      tipoMarbete: 'Premio nacional de artes graficas',
      id_tipoPallet: 0,
      tipoPallet: 'Muestra',
      
    };
      const doc =cuerpoMarbete(marbete);
      let docGeneratorPDF = pdfMake.createPdf(doc as any);
       docGeneratorPDF.open();

  }

}
