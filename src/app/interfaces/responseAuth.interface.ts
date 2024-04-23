import { Rol } from "./usuario.interface";

export interface ResponseAuth {
    ok:      boolean;
    mensaje: string;
    usuario: UsuarioResponse;
}

export interface UsuarioResponse {
    rol:     Rol;
    id_usuario: string;
    nombre:     string;
    login:      string;
}
