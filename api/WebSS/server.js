const { WebSocketServer, WebSocket } = require('ws');
const http = require('http');
const express = require('express');
const app = express();
app.use(express.json());

const appid = process.env.WS_APPID;

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 3000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});

// I'm maintaining all active connections in this object
const clients = {};

app.get('/ws/url', (req, res) => {
  // Generate or obtain the WebSocket URL
  const wsUrl = 'ws://localhost:3000'; // Replace with the actual WebSocket URL

  // Send the WebSocket URL as the response
  res.json({ url: wsUrl });
});

app.post('/connection', (req, res) => {
  const userId = req.body.userId;

  // Create a WebSocket connection for the client
  const connection = new WebSocket(`ws://localhost:3000`);
  connection.onopen = function () {
    console.log(`Connected to WebSocket server with userId ${userId}`);
    connection.send(userId.toString()); // Send the userId to the server
  };

  // Store the new connection and handle messages
  clients[userId] = connection;

  // Handle disconnect when the WebSocket connection is closed
  connection.onclose = () => handleDisconnect(userId);

  res.status(200).send(true);
});




// Connect with userId 1
 const connection = new WebSocket('ws://localhost:3000');
connection.onopen = function() {
   console.log(`Connected to WebSocket server with userId 1`);
   connection.send('1'); // Send the userId to the server
 };

// A new client connection request received
wsServer.on('connection', function(connection) {
  connection.on('message', function message(id) {
    userId = parseInt(id);
    console.log(`Received a new connection.`);

    // Store the new connection and handle messages
    clients[id] = connection;
    console.log(`${userId} connected.`);
  });

  connection.on('close', () => handleDisconnect(userId));
});

function broadcastMessage(data, userId) {
  try {
    let client = clients[userId];
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
      console.log(data);
      return true;
    }
  } catch (error) {
    return false;
  }
}

// User disconnected
function handleDisconnect(userId) {
  console.log(`${userId} disconnected.`);
  delete clients[userId];
}

app.listen(8002, () => {
  console.log(`Listening to 8002`);
});

app.post('/ws/commande/post', (req, res) => {
  customerId = req.body.customerId;
  orderId = req.body.orderId;
 
  const message = `Une nouvelle commande vient d'être reçue avec le numéro de référence ${orderId}`;
  const check = broadcastMessage(message, customerId);

  if (check) {
    res.status(200).json({ success: true, message });
  } else {
    res.status(400).json({ success: false, message: 'Failed to broadcast the message' });
  }
});
