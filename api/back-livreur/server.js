const http = require('http');
const app = require('./app');
const server = http.createServer(app);

server.listen(3005, () => {
    console.log("Server is running at localhost:3000");
});