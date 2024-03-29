// Generated by https://quicktype.io

export interface FetchMovimientos {
    total:       number;
    movimientos: Movimiento[];
}

export interface Movimiento {
    subtotal:    number;
    iva:         number;
    descuento:   number;
    total:       number;
    _id:         string;
    codigo:      string;
    fecha:       Date;
    cliente?:     Cliente;
    productos?:   Producto[];
    usuario?:     Usuario;
    claveAcceso?: string;
}

export interface Cliente {
    estado:            boolean;
    _id:               string;
    identificacion:    string;
    nombre:            string;
    direccion:         string;
    telefono:          string;
    correoelectronico: string;
    usuario?:           string;
    __v?:               number;
}

export interface Producto {
    _id:      string;
    item:     Item;
    cantidad: number;
    precio:   number;
}

export interface Item {
    estado:    boolean;
    precio:    number;
    _id:       string;
    nombre:    string;
    categoria: string;
    usuario?:   string;
    __v?:       number;
}

export interface Usuario {
    _id:    string;
    nombre: string;
}
