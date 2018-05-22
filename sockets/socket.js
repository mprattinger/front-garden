"use strict";

const socketio = require("socket.io");
const winston = require("winston");

class Socket{

    constructor(server){
        this.server = server;
        this.socketServer = socketio.listen(this.server.server);
        this.socketServer.set("origins", "*:*");
        
        this.socketServer.on("connection", this.handleSockets);
    }

    handleSockets(socket){
        winston.info("Client connected!", "Sprinkler Socket");

        socket.on("toggle", data => {
           console.log(data); 
        });
    }
}

module.exports = Socket;