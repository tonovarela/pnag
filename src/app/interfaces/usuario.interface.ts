export interface Usuario {
    id:string;
    nombre:string;
    rol:Rol

}


export enum Rol {
    ADMINISTRADOR="1" ,
    CALIDAD="2", 
    VENTAS ="3"
}
export enum StatusLogin {
    INITIAL,    
    PROCESSING,
    LOGGED,
    LOGOUT,
    ERROR,
    
}