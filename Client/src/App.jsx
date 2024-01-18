import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'


function App() {
  const [socket,setSocket]=useState(null)
  const [message,setMessage]=useState('')
  const [sendMessages,setSendMessages]=useState([])

 useEffect(()=>{
    setSocket(io('http://localhost:4000'))
 },[]) 

 
 useEffect(()=>{

  if(socket){
  socket.on('message from server',(data)=>(
    // console.log("message received",data)
    setSendMessages((prev)=>[...prev, {message:data.message,received:true}])
 ))}

},[socket]) 



 function handleSubmit(e){
  e.preventDefault()
  socket.emit('send-message',{message})
  setSendMessages((prev)=>[...prev, {message,received:false}])
  setMessage('')
 }


  return (<>
      <div>Azppz</div>
      
      <div>
      {sendMessages.map((data)=>{
        return <h1 
        className={`ml-${data.received? 0 : 10}`}
        key={data.message}>{data.message}</h1>
        
      })}

      </div><br></br>

      <form onSubmit={handleSubmit}>
      <input placeholder='message' value={message}
      onChange={(e)=>setMessage(e.target.value)}/>
      <button>Send</button></form>
      </>
  )
}

export default App