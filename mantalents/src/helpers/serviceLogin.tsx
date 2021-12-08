import { cafeApi } from "../api/cafeApi"
import { PostLogin } from "../interfaces/postLogin";



export const postlogin= async (usuario: string, clave:string): Promise<PostLogin> =>{
    let resp;
    resp = await cafeApi.post<PostLogin>(`/auth/login`, { correo:usuario, password:clave } );
    return resp.data;
}
export const renovartoken = async ():Promise<PostLogin>=>{
    const token = localStorage.getItem('token') || '';
    let resp;
    resp = await cafeApi.get<PostLogin>(`/auth`, { headers:{
        'x-token':token
    } } );
    return resp.data;
}