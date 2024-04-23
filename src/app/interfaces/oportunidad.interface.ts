import { Estado } from "./estados.interface";

export interface Oportunidad {
    id_oportunidad:    string;
    id_estado:         string;
    descripcionEstado: string;
    nombreOportunidad: string;
    fecha_registro:    Date;
    id_cliente:        string;
    nombreCliente:     string;
    siguientesEstados?:Estado[];
 
}
