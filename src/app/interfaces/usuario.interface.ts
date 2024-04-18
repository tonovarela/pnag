export interface Usuario {
    id:string;
    nombre:string;
    rol:Rol

}


export enum Rol {
    ADMINISTRADOR ,
    CALIDAD, 
    VENTAS 
}
export enum StatusLogin {
    INITIAL,    
    PROCESSING,
    LOGGED,
    LOGOUT,
    ERROR,
    
}