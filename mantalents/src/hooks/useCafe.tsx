import { useEffect, useState } from "react"
import { fetchcategorias } from "../helpers/serviceCategorias";
import { Categoria } from "../interfaces/fetchCategorias";

export const useCafe=()=>{
 const [isLoading, setIsLoading]=    useState(true);
 const [categorias, setCategorias] = useState<Categoria[]>([]); 
 useEffect(()=>{
    fetchcategorias().then(categorias=>{
        setIsLoading(false);
        setCategorias(categorias);
    });
 }, [] )
 return {
    isLoading,
    setIsLoading,
    categorias,
    setCategorias
 }
}