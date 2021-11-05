import { useEffect, useState } from "react"
import { fetchmovimientos } from "../helpers/serviceMovimientos";
import { Movimiento } from "../interfaces/fetchMovimientos";

export const useMovimiento=()=>{
 const [isLoading, setIsLoading]=    useState(true);
 const [movimientos, setMovimientos] = useState<Movimiento[]>([]); 
 useEffect(()=>{
    fetchmovimientos().then(movimientos=>{
        setIsLoading(false);
        setMovimientos(movimientos);
    });
 }, [] )
 return {
    isLoading,
    setIsLoading,
    movimientos,
    setMovimientos
 }
}