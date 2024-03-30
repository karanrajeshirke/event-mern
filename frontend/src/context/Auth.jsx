import { useContext,useState,createContext, useEffect} from "react";

const AuthContext=createContext()


const AuthProvider=({children})=>
{

    const [auth,setAuth]=useState(
        {
            user:"",
            token:"" 
        }
    )

    useEffect(()=>
    {
        let data=localStorage.getItem('auth')

        if(data)
        {
            let parsedData=JSON.parse(data)

            setAuth((prevAuth)=>
            {
               
               return{
                ...prevAuth,
                user:parsedData.user,
                token:parsedData.token
               }
            })
        }
    },[])
    
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth=()=>
{
    return useContext(AuthContext)
}


export {useAuth,AuthProvider}