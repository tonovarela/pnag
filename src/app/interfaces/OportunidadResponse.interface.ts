import { Estado } from "./estados.interface";
import { Oportunidad } from "./oportunidad.interface";

export interface OportunidadesResponse {
    oportunidades: Oportunidad[];
    estados:Estado[];
}

