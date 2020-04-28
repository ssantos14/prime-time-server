const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;
const startListening = () => {
   server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

const createApp = () => {
   app.get('/', (req, res) => {
      res.send('<h1> Hello there! This is the server for Prime Time :) </h1>');
   });
    
   io.on('connection', (socket) => {
      socket.emit('news', { hello: 'world' });
      socket.on('my other event', (data) => {
         console.log(data);
      });
   });
};

const bootApp = async () => {
    await createApp();
    await startListening();
};

bootApp();
