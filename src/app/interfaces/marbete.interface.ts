export interface Marbete {
    id_oportunidad: string;
    identificador: string;
    cantidad: number;
    inventario:number;
    fechaIngreso: string;
    entrego: string;
    descripcion: string;
    nota: string;
    unidad:string;
    vendedor: string;
    responsable: string;
    fechaSalida: string;
    fechaVencimiento: string;
    sku: string;
    codigoFormato: string;
    instruccionesImpresion:string;
    componente:string;
    tipoMarbete: string;
    id_tipoPallet:number;
    almacen?:string;
    tipoPallet:string;    
}
