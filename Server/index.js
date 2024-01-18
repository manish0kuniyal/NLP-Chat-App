const express =require('express')
const http=require('http')
const path =require('path')
const { Server }=require('socket.io')
const cors=require('cors')
const app=express()

const server=http.createServer(app)

const io=new Server(server,{
  cors:{
    origin:['http://localhost:3000']
  }
})

app.use(express.static(path.resolve('./public')))
app.use(cors())

io.on('connection',(socket)=>{
  //frontend to backend
  socket.on('send-message',(data)=>{
    //sending data from server
    socket.broadcast.emit("message from server",data)
    console.log('message received',data)
  })
  socket.on('disconnect',(socket)=>{
    console.log('...disconnected')
  })
  
})
  



app.get('/',(req,res)=>{
  res.sendFile('/public/index.html')    
})

server.listen(4000,()=>console.log('...on 4000 '))