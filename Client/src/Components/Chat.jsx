import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const emojiList = ['😊', '😂', '😍', '👍', '🎉', '❤️', '😎', '🤔', '👏', '🙌'];

function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [sendMessages, setSendMessages] = useState([]);
  const [ChatRoom, setChatRoom] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [emojiSuggestions, setEmojiSuggestions] = useState([]);

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
        setSendMessages((prev) => [
          ...prev,
          { message: data.message, emoji: data.emoji, received: true }
        ]);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (ChatRoom && socket) {
      socket.emit('join-room', { room: ChatRoom });
    }
  }, [ChatRoom, socket]);

  useEffect(() => {
    if (message.length > 0) {
      const filteredEmojis = emojiList.filter((emoji) =>
        emoji.toLowerCase().includes(message.toLowerCase())
      );
      setEmojiSuggestions(filteredEmojis);
    } else {
      setEmojiSuggestions([]);
    }
  }, [message]);

  function handleEmojiClick(selectedEmoji) {
    setMessage((prevMessage) => prevMessage + selectedEmoji);
    setEmojiSuggestions([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Sending message:', message);
    socket.emit('send-message', { message }, () => {
      console.log('Message sent successfully.');
      setSendMessages((prev) => [...prev, { message, received: false }]);
      setMessage('');
    });
  }

  function SetRoom(e) {
    e.preventDefault();
    setRoomCreated(true);
  }

  return (
    <>
      <div className='mx-[10%]'>NLP CHAT APP</div>
      {roomCreated ? (
        <div className=' mx-[10%]'>
          
          <h1 className='font-mono mt-2 '>ROOM  : <a className='bg-green-500 px-6 p-1 rounded-[2px] text-white'>{ChatRoom}</a></h1>
          <div className='mt-4 bg-green-500 rounded-[12px] p-2 px-4 text-white text-[1rem]'>
            {sendMessages.map((data, index) => (
              <div key={index} className={`ml-${data.received ? 0 : 10} border-b my-2 p-1`}>
              <span className={`ml-${data.received ? 0 : 10}`}>
                {data.message}
              </span>
              <span>{data.emoji} </span>
            </div>            
            ))}
          </div>
          <br />
          <form className='' onSubmit={handleSubmit}>
            <input className='border-2 rounded-[12px] px-2 p-1 text-green-800'
              placeholder='message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {/* <div className='emoji-suggestions border-2 h-[42px]'>
              {emojiSuggestions.map((emoji, index) => (
                <span key={index} onClick={() => handleEmojiClick(emoji)}>
                  {emoji}
                </span>
              ))}
            </div> */}
            <button className='text-white p-1 px-4 bg-green-500 mx-2 rounded-[10px]'>Send</button>
          </form>
        </div>
      ) : (
        <div className='mx-[10%]'>
          <form className=' flex flex-col border-green-300 m-4 p-4' onSubmit={SetRoom}>
            <input className='p-4 border-2 rounded-[12px]' 
              placeholder='enter a room name..'
              onChange={(e) => setChatRoom(e.target.value)}
            />
            <button
             className='mt-4 p-2 w-[50%] rounded-[12px] text-white bg-green-500'
            >Create Room</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chat;
