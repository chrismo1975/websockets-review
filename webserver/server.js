let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({ port: 1337 });

let messages = [];

console.log('webserver started on port 1337');

wss.on('connection', function (ws) {
    messages.forEach(function (message) {
        ws.send(message);
    });

    ws.on('message', function (message) {
        messages.push(message);
        console.log('Message received: %s', message);
        wss.clients.forEach(function (conn) {
            conn.send(message);
        });
    });
});