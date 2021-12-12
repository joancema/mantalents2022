import { Paciente } from "./fetchPacientes";

export interface FetchCitasprevias {
    total:      number;
    citasprevias: Citasprevias[];
}

export interface Citasprevias {
    _id:     string;
    desde:   Date;
    hasta:   Date;
    motivo:  string;
    paciente: Paciente;
    usuario?: Usuario;
}
export interface Citaspreviasplanas {
    _id:     string;
    desde:   Date;
    hasta:   Date;
    motivo:  string;
    paciente: string;
    usuario?: Usuario;
}


export interface Usuario {
    _id:    string;
    nombre: string;
}
