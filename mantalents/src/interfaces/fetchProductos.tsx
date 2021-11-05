import { Usuario } from "./fetchCategorias";

export interface FetchProductos {
    total:     number;
    productos: Producto[];
}

export interface Producto {
    precio:    number;
    _id:       string;
    nombre:    string;
    costo?: number;
    minimo?: number;
    categoria: Categoria;
    usuario?:   Usuario;
    img?: string;
    idaux?:string;
}
export interface ProductoPlano {
    precio:    number;
    id:       string;
    nombre:    string;
    costo?: number;
    minimo?: number;
    categoria: string;
}

export interface Categoria {
    _id:    string;
    nombre: string;
}
