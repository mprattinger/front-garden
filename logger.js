"use strict";

const winston = require("winston");
const path = require("path");
const fs = require("fs");

module.exports.configLogger = function () {
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, { level: "info", colorize: true, "timestamp": true });

    var winstonLogDir = path.join(global.rootDir, "log");
    if (!fs.existsSync(winstonLogDir)) {
        //Erzeugen
        fs.mkdirSync(winstonLogDir);
    }
    winstonLogDir = path.join(winstonLogDir, "fg.log");
    winston.add(require("winston-daily-rotate-file"), {
        filename: winstonLogDir,
        datePattern: "dd-MM-yyyy",
        level: "info"
    });
};
