import { cafeApi } from "../api/cafeApi"
import { Movimiento, FetchMovimientos } from "../interfaces/fetchMovimientos";
import { PostMovimiento } from "../interfaces/postMovimiento";



export const fetchmovimientos = async (): Promise<Movimiento[]> =>{
    const resp= await  cafeApi.get<FetchMovimientos>('/movimientos');
    return resp.data.movimientos;
}
export const fetchUltimoMovimiento= async(): Promise<Movimiento>=>{
    const resp= await cafeApi.get<Movimiento>('movimientos/ultimo');
    return resp.data;
}

export const fetchelectronica=async (idx:string): Promise<any>=>{
    const resp = await cafeApi.get<any>(`/movimientos/electronica/${idx}`);
    return resp;
}
export const fetchDescargar=async (idx:string) : Promise<any> =>{
    const resp =  await cafeApi.get<any>(`/uploads/facturas/${idx}`, {responseType:'blob'});
    //console.log(resp)
    window.open(URL.createObjectURL(resp.data));

}
export const postmovimiento= async (idx: string, movimiento: PostMovimiento): Promise<Movimiento> =>{
    const token = localStorage.getItem('token') || '';
    let resp;
    if (idx.length>0)
    {
         resp = await cafeApi.put<Movimiento>(`/movimientos/${idx}`, movimiento, { headers:{
            'x-token':token
        } } );
    }
    else
    {
         resp = await cafeApi.post<Movimiento>('/movimientos', movimiento, { headers:{
            'x-token':token
        } } );
    }
    return resp.data;
}