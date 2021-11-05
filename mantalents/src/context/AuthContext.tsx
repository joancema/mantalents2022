import React, { createContext, useCallback, useState } from 'react';
import { postlogin, renovartoken } from '../helpers/serviceLogin';


type TipoMetodo = (email: string, password:string) => Promise<boolean>;
type TipoMetodo2 = () => Promise<boolean>;
type TipoMetodo3 = () => boolean;

interface auth{  
        uid?:string,
        checking:boolean,
        logged:boolean,
        name?:string,
        email?:string,
        opciones?:
            {
                _id: string,
                clave:string,
                ruta:string,
                titulo:string,
            }[]
        
}

interface respuesta{
    auth:auth,
    login: TipoMetodo,
    verificaToken: TipoMetodo2,
    logout: TipoMetodo3
}

export const AuthContext = createContext<respuesta>({auth: {uid: '',
checking: true,
logged: true,
name: '',
email: '',
opciones:[{_id:'',clave:'', ruta:'', titulo:''}]
} 
, login: async (email:string, password:string)=>{return false;},
verificaToken:  async () => {return false;}   ,
logout: ()=> {return true;} });

const initialState = {
    uid: '',
    checking: true,
    logged: false,
    name: '',
    email: '',
    opciones: [{_id:'',clave:'', ruta:'', titulo:''}]
};


export const AuthProvider: React.FC = ({ children }) => {

    const [ auth, setAuth ] = useState<auth>(initialState)

    const login = async( email:string, password :string) => {


        const resp = await postlogin(email, password );

        if ( resp.usuario ) {
            localStorage.setItem('token', resp.token );
            const { usuario } = resp;

            console.log(usuario.opciones)

            setAuth({
                uid: usuario.uid ,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.correo,
                opciones: usuario.opciones,
            });

        }

        return true;

    }
    const verificaToken = useCallback( async() => {

        const token = localStorage.getItem('token');
        // Si token no existe
        if ( !token ) {
            setAuth({
                uid: undefined,
                checking: false,
                logged: false,
                name: undefined,
                email: undefined,
                opciones:[]
            })

            return false;
        }

        const resp = await renovartoken();
        if ( resp ) {
            localStorage.setItem('token', resp.token );
            const { usuario } = resp;

            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.correo,
                opciones: usuario.opciones
            });

            return true;
        } else {
            setAuth({
                uid: undefined,
                checking: false,
                logged: false,
                name: undefined,
                email: undefined,
            });

            return false;
        }

    }, [])

    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        });
        return true;
    }


    


    return (
        <AuthContext.Provider value ={{
            auth,
            login,
            verificaToken,
            logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}

