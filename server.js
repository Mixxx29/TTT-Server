// Modules
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Player = require('./player');
const Room = require('./room');

// Constants
const PORT = 8080;
const MAX_CONNECTIONS = 8;

let connection_index = 0;

// Create new express app
const app = express();

// Create new server
const server = http.createServer(app);

// Create websocket server
const wss = new WebSocket.Server({server: server});

// Socket events
wss.on("connection", client => {
    console.log('New client connected!');
    let newPlayer = Player.create(client);
    let room = Room.joinOrCreate(newPlayer);

    var msg = "Welcome player " + newPlayer.id + "!\n You have joined room " + room.id + "!";
    client.send(JSON.stringify({playerID: newPlayer.id, message: msg}));

    client.on('message', data => {
        data = JSON.parse(data);

        player = Player.get(data.playerID);
        if (player.id === player.room.player1.id) {
            player.room.player2.socket.send(JSON.stringify({playerID: player.id, message: data.message}));
        } else {
            player.room.player1.socket.send(JSON.stringify({playerID: player.id, message: data.message}));
        }
    });
});

// Homepage
app.get("/", (req, res) => {
   res.send("Bravo Cacaj!");
});

// Start server
server.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});