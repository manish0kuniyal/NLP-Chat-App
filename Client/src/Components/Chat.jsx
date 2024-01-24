import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [sendMessages, setSendMessages] = useState([]);
  const [ChatRoom, setChatRoom] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [given, setGiven] = useState(['👋','🙏','🤟'])

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
        
  console.log('Received message:', data);
        setSendMessages((prev) => [
          ...prev,
          { message: data.message, emoji: data.emoji, received: data.senderId !== socket.id }
        ]);

        // Set the emoji as the placeholder
        setGiven(data.emoji);
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
      console.log('Message sent successfully.');
      setSendMessages((prev) => [
        ...prev,
        { message, emoji: given, received: true }
      ]);
      setMessage('');
    });
  }

  function SetRoom(e) {
    e.preventDefault();
    setRoomCreated(true);
  }

  function copyEmojiToClipboard() {
    navigator.clipboard.writeText(given);
  }

  return (
    <><div></div>
      <div className='mx-[10%]'>NLP CHAT APP</div>
      {roomCreated ? (
        <div className=' mx-[10%]'>
          
          <h1 className='font-mono mt-2 '>ROOM  : <a className='bg-green-500 px-6 p-1 rounded-[2px] text-white'>{ChatRoom}</a></h1>
          <div className='mt-4 lg:mr-[50%] bg-green-500  rounded-[5px] p-2 px-4 text-white text-[1rem]'>
          {sendMessages.map((data, index) => {
  console.log('Received message data:', data);
  return (
    <div
      key={index}
      className={` 
         my-2 p-1 overflow-hidden `}
    >
      <p className={`pl-${data.received ? '[5%]': '[80%]'} text-[1.1rem] underline w-[100%] font-mono`}>
        {data.message}
      </p>
    </div>
  );
})}

          </div>
          <br /><div className=' lg:mr-[50%]' >
          <form onSubmit={handleSubmit} className='flex justify-between'>
            <input
              className='w-[70%] border-2 rounded-[12px] px-2 p-1 text-green-800'
              placeholder='message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className='w-[20%] text-white p-1 px-4 bg-green-500 mx-2 rounded-[10px]'
            >
              Send
            </button>
          </form>
          <div className="w-[40vmin]  flex justify-between items-center border-2 my-2 rounded-[12px]">
          <div className="w-[70%]  flex justify-evenly items-center my-2 rounded-[12px]">
          {given.map((emoji, index) => (
          <span key={index} className="text-[100%]">{emoji}</span>
          ))}
          </div>
            <button
              className='text-white p-2 px-4 mr-4 text-[.5rem] bg-blue-500 rounded-[10px]'
              onClick={copyEmojiToClipboard}
            >
              Copy
            </button>
          </div></div>
        </div>
      ) : (
        <div className='mx-[10%]'>
          <form className=' flex flex-col border-green-300 m-4 p-4' onSubmit={SetRoom}>
            <input
              className='p-4 border-2 rounded-[12px]'
              placeholder='enter a room name..'
              onChange={(e) => setChatRoom(e.target.value)}
            />
            <button
              className='mt-4 p-2 w-[50%] rounded-[12px] text-white bg-green-500'
            >
              Create Room
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chat;
