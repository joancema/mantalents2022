import { useEffect, useState } from "react"
import { fetchpacientes } from "../helpers/servicePacientes";
import { Cita, Paciente } from "../interfaces/fetchPacientes";

export const usePaciente=()=>{
 const [isLoading, setIsLoading]=    useState(true);
 const [pacientes, setPacientes] = useState<Paciente[]>([]); 
 const [citas, setCitas] =  useState<Cita[]>([]);
 useEffect(()=>{
    fetchpacientes().then(pacientes=>{
        setIsLoading(false);
        setPacientes(pacientes);
    });
 }, [] )
 return {
    isLoading,
    setIsLoading,
    pacientes,
    setPacientes,
    citas,
    setCitas
 }
}