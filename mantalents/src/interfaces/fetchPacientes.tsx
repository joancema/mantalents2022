// Generated by https://quicktype.io

export interface FetchPacientes {
    total:     number;
    pacientes: Paciente[];
}

export interface Paciente {
    citas?:           Cita[];
    _id:             string;
    rut:             string;
    nombre:          string;
    direccion:       string;
    telefono:        string;
    fechanacimiento: Date;
    alergia:         string;
    sexo:            string;
    email:           string;
    nacionalidad:    string;
    previsionsalud:  string;
    otrosdatos:      string;
    img?:            string;
    usuario?:         Usuario;
}

export interface Cita {
    estado?:               boolean;
    _id:                  string;
    estatura:             string;
    peso:                 string;
    temperatura:          string;
    presionalterial:      string;
    imc:                  string;
    pulso:                string;
    hemo:                 string;
    fecha:                Date;
    anamnesis:            string;
    diagnostico:          string;
    tratamiento:          string;
    medicamento:          string;
    fechaproximaatencion: Date;
    usuario?:              string;
    img?:                  string;
    __v?:                  number;
}

export interface Usuario {
    _id:    string;
    nombre: string;
}