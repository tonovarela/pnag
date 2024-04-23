import { Component, effect, EffectRef, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BaseGridComponent } from '../../abstract/BaseGrid.component';
import { OportunidadService } from '../../services/oportunidad.service';
import { Estado } from '../../interfaces/estados.interface';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { cuerpoMarbete } from '../../marbete/marbete.print';
import { Marbete } from '../../interfaces/marbete.interface';
import { UsuarioService } from '../../services/usuario.service';
import { Rol } from '../../interfaces/usuario.interface';
import { Oportunidad } from '../../interfaces/oportunidad.interface';

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
export class ListadoComponent extends BaseGridComponent implements OnInit, OnDestroy {

  oportunidades = signal<Oportunidad[]>([]);
  oportunidadService = inject(OportunidadService);
  pendientes = signal(true);
  estados: Estado[] = [];
  usuarioService = inject(UsuarioService);

  effectRef: EffectRef;

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.effectRef.destroy();

  }

  constructor() {
    super();
    this.effectRef = effect(() => this.cargarInfo(this.pendientes()))
  }


  ngOnInit(): void {
    this.autoFitColumns = false;
    this.iniciarResizeGrid(350);
    this.pendientes.set(true);

  }


  private cargarInfo(pendientes: boolean) {
    this.oportunidadService.listar(pendientes).subscribe((response) => {
      this.estados = response.estados;
      const oportunidades = response.oportunidades.map((oportunidad: Oportunidad) => {
        const siguienteEstados = this.obtenerSiguienteEstado(oportunidad.id_estado);
        const estadosConPermisos = this.habilitarPermisos(siguienteEstados,oportunidad.id_estado);
        oportunidad.siguientesEstados = estadosConPermisos;        
        return oportunidad;
      });
      this.oportunidades.set(oportunidades)
    });
  }

  cambioEstatus(oportunidad: Oportunidad) {
    const {
      id_oportunidad,
      id_estado,
      nombreOportunidad,
      id_cliente,
      nombreCliente,
    } = oportunidad;


    const oportunidadActualizar = {
      id_oportunidad,
      id_estado,
      nombre: nombreOportunidad,
      id_cliente,
      nombreCliente,
    };
     const {id} = this.usuarioService.usuarioLogueado()
    this.oportunidadService.actualizarEstatus(oportunidadActualizar,id).subscribe(_ => this.cargarInfo(this.pendientes()))


  }


  tooglePendientes() {
    const t = !this.pendientes();
    this.pendientes.set(t);
  }


  obtenerSiguienteEstado(id_estado: string) {
    let estado: Estado[] = [];

    if (id_estado === '1') {
      estado = this.estados.filter(x => ["1", "2"].includes(x.id));
    }
    if (id_estado === '2') {
      estado = this.estados.filter(x => ["3", "2"].includes(x.id));
    }
    if (id_estado === '3') {
      estado = this.estados.filter(x => x.id === '3');
    }
    return estado;

  }


  habilitarPermisos(estados: Estado[], id_estadoSeleccionado: string): Estado[] {
    let _newEstados: Estado[] = estados.map(x => { return { ...x, habilitado: true } });
    const { rol } = this.usuarioService.usuarioLogueado();
    //Deshabilitar a calidad el pasar al siguiente rol            
    if (Rol.CALIDAD === rol && id_estadoSeleccionado === "2") {      
      _newEstados = _newEstados.map(x => {return { ...x, habilitado: x.id !== '3' }});
    }  
    if (Rol.VENTAS === rol && id_estadoSeleccionado === "1") {      
      _newEstados = _newEstados.map(x => {return { ...x, habilitado: x.id !== '2' }});
    }  
    return _newEstados;
  }
 

  imprimirMarbete(oportunidad: Oportunidad) {
    const marbete: Marbete = {
      id_oportunidad: oportunidad.id_oportunidad!,
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
    const doc = cuerpoMarbete(marbete);
    let docGeneratorPDF = pdfMake.createPdf(doc as any);
    docGeneratorPDF.open();

  }

}
