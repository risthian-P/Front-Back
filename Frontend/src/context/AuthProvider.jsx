import axios from "axios"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()
// contenidod del mensaje ususario va a iniciar sesion
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    // crear una funcion para obtener el usuario del endpoint para el perfil del usuario
    const perfil = async(token) => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta= await axios.get(url,options)
            setAuth(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }
    // creacion del useEffect para que se ejecute la funcion perfil
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])
    // retornae en el contenido del mensaje
    return (
        <AuthContext.Provider value={
            // el contenido a ser enviado
            {
                auth,
                setAuth              
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext