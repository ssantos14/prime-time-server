// create an express application
const express = require('express');
const app = express();
// create an http server by passing in the express app
const server = require('http').Server(app);
// initialize a new instance of socket.io by passing the http server object
const io = require('socket.io')(server);

// function to start listening on port
const PORT = process.env.PORT || 8080;
const startListening = () => {
   server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

// function that defines server functionality
const createApp = () => {
   // handles requests to the home url
   app.get('/', (req, res) => {
      res.send('<h1> Hello there! This is the server for Prime Time :) </h1>');
   });
   
   // handles connection events to our socket
   io.on('connection', (socket) => {
      console.log('user connected');
      // handles 'chat message' event
      socket.on('chat message', (msg) => {
         console.log('message: ' + msg);
         // send 'chat message' event to everyone (including the sender)
         io.emit('chat message', msg);
      });
      // handles disconnect events to our socket
      socket.on('disconnect', () => {
         console.log('user disconnected');
      });
   });
};

const bootApp = async () => {
    await createApp();
    await startListening();
};

bootApp();
