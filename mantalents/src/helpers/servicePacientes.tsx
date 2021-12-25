import { cafeApi } from "../api/cafeApi"
import { Paciente, FetchPacientes, Cita } from "../interfaces/fetchPacientes";


export const fetchpacientes = async (): Promise<Paciente[]> =>{
    const resp= await  cafeApi.get<FetchPacientes>('/pacientes');
    return resp.data.pacientes;
}
export const fetchPacienteCita = async (idcitax:string): Promise<Paciente> =>{
    const resp = await cafeApi.get<Paciente>(`/pacientes/cita/${idcitax}`);
    return resp.data;
}
export const obtenerEnlace= ():string=>{
    return cafeApi.defaults.baseURL!.replace('api','');
}
export const fetchDescargar=async (idx:string) : Promise<any> =>{
    const basej= (cafeApi.defaults.baseURL?.replace('api','') );
    const resp =  await cafeApi.get<any>(`${basej}uploads/consultas/${idx}.pdf`, {responseType:'blob'});
    window.open(URL.createObjectURL(resp.data));
}
export const postpaciente= async (paciente: Paciente): Promise<Paciente> =>{
    const token = localStorage.getItem('token') || '';

    let resp;
    try{

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
    catch(error )
    {
        console.log(token)
        console.log(error)
        return paciente;
        
    }
    
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
    const token = localStorage.getItem('token') || '';
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