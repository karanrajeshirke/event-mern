import { useState,useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner";



 function AdminRoute()
{
    const [auth,setAuth]=useAuth()
    const [ok,setOk]=useState(false)

    useEffect(()=>
    {
        console.log("Private route rendered")
        const authCheck= async ()=>
        {
            try
            {
                const response=await axios.get('http://localhost:8080/api/auth/admin-auth',{
                    headers:
                    {
                        "Authorization":auth.token
                    }
                })
                if(response.data.ok===true)
                setOk(true)
            
            }
            catch(err)
            {
                if(err.response)
                console.log(err.response.data)
                else
                console.log(err)
            }
        }

        if(auth.token)
        {
            authCheck()
        }

    },[auth.token])

    

    return ok===true ? <Outlet/> :<Spinner/>
}



export  {AdminRoute}