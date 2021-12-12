import { useEffect, useState } from "react"
import { fetchcitasprevias } from "../helpers/serviceCitasprevias";
import { Citasprevias } from "../interfaces/fetchCitasPrevias";

export const useCitaprevia=()=>{
 const [isLoading, setIsLoading]=    useState(true);
 const [citasprevias, setCitasprevias] =  useState<Citasprevias[]>([]);
 useEffect(()=>{
    fetchcitasprevias().then(citasprevias=>{
        setIsLoading(false);
        setCitasprevias(citasprevias);
    });
 }, [] )
 return {
    isLoading,
    setIsLoading,
    citasprevias,
    setCitasprevias
 }
}