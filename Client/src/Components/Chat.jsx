import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [sendMessages, setSendMessages] = useState([]);
  const [ChatRoom, setChatRoom] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);

  useEffect(() => {
    setSocket(io('http://localhost:4000'));

    // Cleanup function
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message from server', (data) => {
        setSendMessages((prev) => [...prev, { message: data.message, received: true }]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (ChatRoom && socket) {
      socket.emit('join-room', { room: ChatRoom });
    }
  }, [ChatRoom, socket]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Sending message:', message);
    socket.emit('send-message', { message }, () => {
    console.log('Message sent successfully.')
    setSendMessages((prev) => [...prev, { message, received: false }])
    setMessage('')
    })
   }
  

  function SetRoom(e) {
    e.preventDefault();
    setRoomCreated(true);
  }

  return (
    <>
      <div>Azppz</div>
      {roomCreated ? (
        <div className='border-2'>
          <div>
            {sendMessages.map((data,index) => (
              <h1 className={`ml-${data.received ? 0 : 10}`} key={index}>
                {data.message}
              </h1>
            ))}
          </div>
          <br></br>
          <h1>{ChatRoom}</h1>
          <form onSubmit={handleSubmit}>
            <input
              placeholder='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button>Send</button>
          </form>
        </div>
      ) : (
        <div>
          <form className='border-2 border-green-300 m-4' onSubmit={SetRoom}>
            <input
              placeholder='enter room name'
              onChange={(e) => setChatRoom(e.target.value)}
            />
            <button>Create room</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chat;
