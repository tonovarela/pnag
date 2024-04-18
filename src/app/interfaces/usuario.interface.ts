export interface Usuario {
    id:string;
    nombre:string;
}

export enum StatusLogin {
    INITIAL,    
    PROCESSING,
    LOGGED,
    LOGOUT,
    ERROR,
    
}