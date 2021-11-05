import { cafeApi } from "../api/cafeApi"
import { Persona, FetchPersonas } from "../interfaces/fetchPersonas";
const token = localStorage.getItem('token') || '';

export const fetchpersonas = async (): Promise<Persona[]> =>{
    const resp= await  cafeApi.get<FetchPersonas>('/personas');
    return resp.data.personas;
}
export const postpersona= async (persona: Persona): Promise<Persona> =>{
    let resp;
    if (persona._id.length>0)
    {
         resp = await cafeApi.put<Persona>(`/personas/${persona._id}`, persona, { headers:{
            'x-token':token
        } } );
    }
    else
    {
         resp = await cafeApi.post<Persona>('/personas', persona, { headers:{
            'x-token':token
        } } );
    }
    return resp.data;
}