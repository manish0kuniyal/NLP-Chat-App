import React from 'react'
import { signInWithPopup,signOut } from 'firebase/auth'
import { googleProvider,auth } from '../firebase'
import GoogleIcon from '@mui/icons-material/Google';
import Cookies from "universal-cookie"
const cookies=new Cookies()

const Auth=(props)=>{
    const { setIsAuth }=props
    const signInWithGoogle=async()=>{
    
    try{
        const result=await signInWithPopup(auth,googleProvider)
        cookies.set("auth-token",result.user.refreshToken)
        setIsAuth(true)
    }
    catch(err){
        console.log(err)
    }
}
const Logout=async()=>{
    try{
        await signOut(auth)
    }
    catch(err){
        console.log(err)
    }
}

    return(
        <>
        <div className="flex flex-col -3 justify-evenly h-[60vmin] sm:h-[50vmin] w-[90vmin] sm:w-[60vmin] my-[40vmin] sm:my-[20vmin] mx-[auto]   ">
            <h1 className='font-mono text-center text-[2rem] sm:text-[2.5rem]'>Welcome to <b className='text-white p-2 bg-green-600'>EcoExchange!</b></h1>
            <h1 className='font-mono text-center text-[1rem] sm:text-[1.5rem]'>“Sustainably Connected, Locally Empowered.”</h1>
        <button className='rounded-[20px] w-[70%] font-bold mx-[auto] border-2 p-4' onClick={signInWithGoogle}>Sign in with Google <GoogleIcon className='ml-2'/> </button>
        {/* <button className='rounded-[20px] border-2 w-[30%] p-2 mx-[auto]' onClick={Logout}>Logout</button> */}
        </div>
        </>
    )
}
export default Auth