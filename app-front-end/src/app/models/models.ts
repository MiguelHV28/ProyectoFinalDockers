export interface ProductModel {
    codigo:string,
    nombre:string,
    foto:string,
    descripcion:string
}

export interface ProductoM{
 id?:string,
 codigo?: string,
 descripcion?: string,
 categoria?: string, 
 proveedor?:string,
 provDescr?:string,
 precio?: number
}

export interface productos{
    productos?:ProductoM[]
}

export interface Respuesta{
    status?:number,
    descripcion?:string,
    message?:string,
    result?:productos,
    error?:string
}