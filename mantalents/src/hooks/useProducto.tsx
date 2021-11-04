import { useEffect, useState } from "react"
import { fetchproductos } from "../helpers/serviceProductos";
import { Producto } from "../interfaces/fetchProductos";

export const useProducto=()=>{
 const [isLoading, setIsLoading]=    useState(true);
 const [productos, setProductos] = useState<Producto[]>([]); 
 useEffect(()=>{
    fetchproductos().then(productos=>{
        setIsLoading(false);
        setProductos(productos);
    });
 }, [] )
 return {
    isLoading,
    setIsLoading,
    productos,
    setProductos
 }
}