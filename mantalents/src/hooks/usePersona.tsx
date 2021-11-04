import { useEffect, useState } from "react"
import { fetchpersonas } from "../helpers/servicePersonas";
import { Persona } from "../interfaces/fetchPersonas";

export const usePersona=()=>{
 const [isLoading, setIsLoading]=    useState(true);
 const [personas, setPersonas] = useState<Persona[]>([]); 
 useEffect(()=>{
    fetchpersonas().then(personas=>{
        setIsLoading(false);
        setPersonas(personas);
    });
 }, [] )
 return {
    isLoading,
    setIsLoading,
    personas,
    setPersonas
 }
}