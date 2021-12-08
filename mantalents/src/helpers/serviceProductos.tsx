import { cafeApi } from "../api/cafeApi"
import { Producto, FetchProductos, ProductoPlano } from "../interfaces/fetchProductos";



export const fetchproductos = async (): Promise<Producto[]> =>{
    const resp= await  cafeApi.get<FetchProductos>('/productos');
    resp.data.productos.map(ele=>{
        return ele.idaux= ele._id;
    })
    return resp.data.productos;
}
export const getFileProducto = (parametro:string):string=>{
    return  `${cafeApi.defaults.baseURL?.substr(0, cafeApi.defaults.baseURL?.lastIndexOf("/")) }/uploads/productos/${parametro}`;
}

export const postFileProducto = async (idx:string, archivo:File ): Promise<Producto>=>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    const resp =  await cafeApi.put(`/uploads/productos/${idx}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
    return resp.data;
}
export const postproducto= async (producto: ProductoPlano): Promise<Producto> =>{
    const token = localStorage.getItem('token') || '';
    let resp;
    console.log(producto);
    if (producto.id.length>0)
    {
         resp = await cafeApi.put<Producto>(`/productos/${producto.id}`, producto, { headers:{
            'x-token':token
        } } );
    }
    else
    {
         resp = await cafeApi.post<Producto>('/productos', producto, { headers:{
            'x-token':token
        } } );
    }
    return resp.data;
}