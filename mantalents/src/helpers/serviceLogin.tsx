import { cafeApi } from "../api/cafeApi"
import { PostLogin } from "../interfaces/postLogin";

const token = localStorage.getItem('token') || '';

export const postlogin= async (usuario: string, clave:string): Promise<PostLogin> =>{
    let resp;
    resp = await cafeApi.post<PostLogin>(`/auth/login`, { correo:usuario, password:clave } );
    return resp.data;
}
export const renovartoken = async ():Promise<PostLogin>=>{
    let resp;
    resp = await cafeApi.get<PostLogin>(`/auth`, { headers:{
        'x-token':token
    } } );
    return resp.data;
}