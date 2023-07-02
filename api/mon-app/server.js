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

// Connect with userId 1
// const connection = new WebSocket('ws://localhost:3000');
// connection.onopen = function() {
//   console.log(`Connected to WebSocket server with userId 1`);
//   connection.send('1'); // Send the userId to the server
// };

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
 
  const check = broadcastMessage(
    `Une nouvelle commande vient d'être reçue avec le numéro de référence ${orderId}`,
    customerId
  );
 
  if (check) {
    res.status(200).send(true);
   
  } else {
    res.status(400).send(false);
  }
});
