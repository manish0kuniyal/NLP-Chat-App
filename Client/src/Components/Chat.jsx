import React, { useEffect, useState } from 'react'
import {addDoc,collection,serverTimestamp,onSnapshot,query,where, orderBy} from 'firebase/firestore'
import { auth } from '../firebase'
import {db} from '../firebase'
// import { query } from 'express'
function Chat(props) {
    const {room}=props
    const [newMessage,setNewMessage]=useState("")
    const [messages,setMessages]=useState([])
    const messagesRef=collection(db,"messages")

    useEffect(()=>{
        const queryMessages=query(messagesRef,where("room","==",room),orderBy("createdAt"))
      const unsubscribe=  onSnapshot(queryMessages,(snapshot)=>{
            let messages=[]
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id})
            })
            setMessages(messages)
        })
        return ()=>unsubscribe()
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(newMessage==="")
        return

        await addDoc(messagesRef,{
            text:newMessage,
            createdAt:serverTimestamp(),
            user:auth.currentUser.displayName,
            room
        })

        setNewMessage("")
    }
 
    return (
    <div className=' flex flex-col mx-[5%] p-4 sm:mx-[35%]'>
        <div className=''>
        <h1 className='font-bold text-[1.4rem] my-3'>Welcome to room : {room.toUpperCase()}</h1>
        </div>
        <div className='my-4 font-mono'>
        {messages.map((message)=>
        <h1><b className='font-sans'>{message.user}</b> : {message.text}</h1>)}
        
        </div>

      <form onSubmit={handleSubmit} className=' flex flex-col'>
        <input className='border-2 rounded-[12px] p-2 my-2' placeholder='type message...'
        onChange={(e)=>setNewMessage(e.target.value)}
         value={newMessage}
        />
        <button className='text-white font-bold my-4 p-1 w-[30%] bg-green-600'>
            Send
        </button>
      </form>
    </div>
  )
}

export default Chat
