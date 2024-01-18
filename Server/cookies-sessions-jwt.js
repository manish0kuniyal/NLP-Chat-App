

// cookies serve as a way for browser to remeber some piece of info about you
// ?keyvalue pair
//inspect element application or storage in firefox

// inorder to access in the client side on the inspect console add document.cookie

const express =require('express')
// ookies are small pieces of data stored on a user's browser, 
// and a cookie parser extracts and organizes this information for server-side processing.
const cookieParser=require('cookie-parser')
const app=express()

app.use(cookieParser())

app.get('/',(req,res)=>{
    //can't access cookies from client side  
    res.cookie('tstcookie' ,'itsaCookie',{httpOnly:true})
    res.cookie('cookieSend' ,'itsAnotherCookie')
    res.cookie('cookieSendw' ,'itsAnotherCookiew')
    console.log(res.cookie)
    //cookie should always be send first
    res.send('opk')
})

app.listen(4000,()=>console.log("...on 4000"))