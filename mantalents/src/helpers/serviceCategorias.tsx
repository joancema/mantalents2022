import { cafeApi } from "../api/cafeApi"
import { Categoria, FetchCategorias } from "../interfaces/fetchCategorias";


export const fetchcategorias = async (): Promise<Categoria[]> =>{
    const resp= await  cafeApi.get<FetchCategorias>('/categorias');
    return resp.data.categorias;
}
export const postcategoria= async (categoria: Categoria): Promise<Categoria> =>{
    const token = localStorage.getItem('token') || '';
    let resp;
    if (categoria._id.length>0)
    {
         resp = await cafeApi.put<Categoria>(`/categorias/${categoria._id}`, categoria, { headers:{
            'x-token':token
        } } );
    }
    else
    {
         resp = await cafeApi.post<Categoria>('/categorias', categoria, { headers:{
            'x-token':token
        } } );
    }
    return resp.data;
}