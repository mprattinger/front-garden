"use strict";

const winston = require("winston");
const os = require("os");

var onoff = null;
if (os.platform() == "linux") {
    onoff = require("onoff").Gpio;
} else {
    onoff = require("./mocks/onoffMock");
}

class Circle {

    constructor(sprinkler){
        this.circle = new onoff(sprinkler.gpio, "out");
        this.isOn = false;
    }

    switch(){
        this.isOn != this.isOn;
        this.circle.writeSync(this.isOn ? 1 : 0);
    }
}