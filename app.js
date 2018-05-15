"use strict";

const winston = require("winston");
const _ = require("underscore");

const httpServer = require("./server");
const logger = require("./logger");
const dbService = require("./services/dbService");
const socketMod = require("./sockets/socket");

global.rootDir = __dirname;

class Main{

    constructor(){
        logger.configLogger();
    }

    InitApplication(){
        var that = this;
        winston.info("Initializing application....");

        return new Promise(resolve => {
            that.webServer = new httpServer();
            that.dbService = new dbService(__dirname);
            that.socket = null;

            Promise.all([that.webServer.runServer(that.dbService)])
                .then(data => {
                    winston.info("Application initialized! Run socket.io....");
                    that.socket = new socketMod(that.webServer);
                    resolve();
                })
                .catch(err => {
                    throw err;
                });
        });
    }
}

var main = new Main();

main.InitApplication().then((data) => {
    winston.info("Frontgarden gestartet!");
    // main.RunProgramLoop();
}).catch((err) => {
    winston.error("An error occured when initializing the app", err);
});

// Catch CTRL+C
process.on('SIGINT', () => {
    main.run = false;
    console.log('\nCTRL+C...');
    process.exit(0);
});