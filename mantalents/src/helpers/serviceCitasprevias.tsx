import { cafeApi } from "../api/cafeApi"
import { Citasprevias, Citaspreviasplanas, FetchCitasprevias } from "../interfaces/fetchCitasPrevias";


export const fetchcitasprevias = async (): Promise<Citasprevias[]> =>{
    const resp= await  cafeApi.get<FetchCitasprevias>('/citasprevias');
    console.log(resp.data.citasprevias)
    return resp.data.citasprevias;
}
export const postcitaprevia= async (citaprevia: Citaspreviasplanas): Promise<Citasprevias> =>{
    const token = localStorage.getItem('token') || '';
    let resp;
    if (citaprevia._id.length>0)
    {
         resp = await cafeApi.put<Citasprevias>(`/citasprevias/${citaprevia._id}`, citaprevia, { headers:{
            'x-token':token
        } } );
    }
    else
    {
         resp = await cafeApi.post<Citasprevias>('/citasprevias', citaprevia, { headers:{
            'x-token':token
        } } );
    }
    return resp.data;
}