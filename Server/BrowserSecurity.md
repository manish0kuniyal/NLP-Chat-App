## COOKIE
### block client side cookie from server side

```
app.get('/',(req,res)=>{
    
    // secure:true can be accessed only on https domains
    res.cookie('tstcookie' ,'itsaCookie',{httpOnly:true,secure:true})
    //cookie should always be send first
    res.send('ok')
})
```
