const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const Sentiment = require('sentiment');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
});

// Keep track of rooms and their associated sockets
const roomSockets = {};

app.use(express.static(path.resolve('./public')));
app.use(cors());

io.on('connection', (socket) => {
  socket.on('send-message', (data) => {
    // Analyzing sentiment and determining emoji
    const sentiment = analyzeSentiment(data.message);
    const emoji = getEmojiBySentiment(sentiment);

    // Broadcasting the message and emoji to sockets in the same room
    const room = roomSockets[socket.id];
    if (room) {
      io.to(room).emit('message from server', { message: data.message, emoji });
    }
  });

  socket.on('join-room', ({ room }) => {
    // Join the specified room
    socket.join(room);
    roomSockets[socket.id] = room;
    console.log(`${socket.id} joined room ${room}`);
  });

  socket.on('disconnect', () => {
    // Remove the socket from the roomSockets object on disconnect
    const room = roomSockets[socket.id];
    if (room) {
      delete roomSockets[socket.id];
      console.log(`${socket.id} left room ${room}`);
    }
    console.log('...disconnected');
  });
});

app.get('/', (req, res) => {
  res.sendFile('/public/index.html');
});

server.listen(4000, () => console.log('...on 4000 '));

function analyzeSentiment(text) {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);
  return result.score;
}

function getEmojiBySentiment(sentimentScore) {
  if (sentimentScore < -1) {
    return '😢'; // Very sad
  } else if (sentimentScore < 0) {
    return '😞'; // Sad
  } else if (sentimentScore === 0) {
    return null; // Neutral
  } else if (sentimentScore < 2) {
    return '😊'; // Happy
  } else {
    return '😄'; // Very happy
  }
}
