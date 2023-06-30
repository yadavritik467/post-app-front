import { useEffect } from "react";
import { useContext,useState, createContext } from "react";


const AuthContext = createContext();
const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    })

    useEffect(()=>{
        const data = localStorage.getItem("userID")
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
        }

    },[])
       
        
   
    return(
            <AuthContext.Provider value={[auth,setAuth]}>
                {children}
            </AuthContext.Provider>
        )
}

// custom hook

const useAuth = ()=> useContext(AuthContext)

export {useAuth,AuthProvider}