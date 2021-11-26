import { cafeApi } from "../api/cafeApi"
import { Paciente, FetchPacientes, Cita } from "../interfaces/fetchPacientes";
const token = localStorage.getItem('token') || '';

export const fetchpacientes = async (): Promise<Paciente[]> =>{
    const resp= await  cafeApi.get<FetchPacientes>('/pacientes');
    return resp.data.pacientes;
}
export const postpaciente= async (paciente: Paciente): Promise<Paciente> =>{
    let resp;
    if (paciente._id.length>0)
    {
         resp = await cafeApi.put<Paciente>(`/pacientes/${paciente._id}`, paciente, { headers:{
            'x-token':token
        } } );
    }
    else
    {
         resp = await cafeApi.post<Paciente>('/pacientes', paciente, { headers:{
            'x-token':token
        } } );
    }
    return resp.data;
}
export const getFilePaciente = (parametro:string):string=>{
    return  `${cafeApi.defaults.baseURL?.substr(0, cafeApi.defaults.baseURL?.lastIndexOf("/")) }/uploads/pacientes/${parametro}`;
}
export const getFileCita = (parametro:string):string=>{
    return  `${cafeApi.defaults.baseURL?.substr(0, cafeApi.defaults.baseURL?.lastIndexOf("/")) }/uploads/citas/${parametro}`;
}
export const postFilePaciente = async (idx:string, archivo:File ): Promise<Paciente>=>{
    let formData = new FormData();
    formData.append("archivo", archivo);

    const resp =  await cafeApi.put(`/uploads/pacientes/${idx}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return resp.data;
}
export const postFileCita = async (idx:string, archivo:File): Promise<Cita>=>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    const resp =  await cafeApi.put(`/uploads/citas/${idx}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return resp.data;
}
export const postcita = async (cita: Cita, idpacientex:string=""): Promise<Cita> =>{
    let resp;
    if (cita._id.length>0)
    {
        resp = await cafeApi.put<Cita>(`/citas/${cita._id}`, cita, { headers:{
            'x-token':token
        } } );
    }
    else
    {
        
        resp = await cafeApi.post<Cita>(`/citas/${idpacientex}`, cita, { headers:{
            'x-token':token
        } } );
    }
    return resp.data;
}