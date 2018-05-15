"use strict";

const express = require("express");
const winston = require("winston");
 
class Routes {

    constructor(db) {
        this.router = express.Router();
        this._createRoutes();
        this.db = db;
    }

    _createRoutes() {
        var that = this;

        that.router.route("/circles/:circleId?")
            .get((req, res) => {
                if (req.params.circleId) {
                    //Speziellen Circle zurückgeben
                    that.db.getSprinklerById(req.params.circleId)
                        .then((doc) => {
                            if (!doc) {
                                winston.warn("Sprinkler with id " + req.params.circleId + " not found in database", doc);
                                res.status(400);
                                res.send({ message: "Sprinkler with id " + req.params.circleId + " not found in database", document: doc });
                            } else {
                                res.status(200);
                                res.send(doc);
                            }
                        }).catch(err => {
                            winston.error("Error reading sprinkler with id " + req.params.circleId + " from database", err);
                            res.status(500);
                            res.send({ message: err });
                        });
                } else {
                    that.db.getSprinklers().then((docs) => {
                        res.status(200);
                        res.send(docs);
                    })
                        .catch(err => {
                            winston.error("Error reading all sprinklers from database", err);
                            res.status(500);
                            res.send({ message: err });
                        });
                }
            })
            .post((req, res) => {
                //Create
                var newSprinkler = {};
                newSprinkler.name = req.body.name;
                newSprinkler.gpio = req.body.gpio;
                newSprinkler.autoTime = req.body.autoTime;
                that.db.addSprinkler(newSprinkler).then(newDoc => {
                    winston.info("New sprinkler created!", newDoc);
                    res.status(201);
                    res.send(newDoc);
                }).catch(err => {
                    winston.error("Error creating sprinkler in database!", [err, newSprinkler]);
                    res.status(500);
                    res.send({ message: err });
                });
            })
            .put((req, res) => {
                //Update
                that.db.getSprinklerById(req.params.circleId)
                    .then((doc) => {
                        if (!doc) {
                            winston.error("Sprinkler with id " + req.params.circleId + " not found in database", doc);
                            res.status(400);
                            res.send({ message: "Sprinkler with id " + req.params.circleId + " not found in database", document: doc });
                        } else {
                            var modified = false;
                            if (req.body.name && req.body.name != doc.name) {
                                doc.name = req.body.name;
                                modified = true;
                            }
                            if (req.body.gpio && req.body.gpio != doc.gpio) {
                                doc.gpio = req.body.gpio;
                                modified = true;
                            }
                            if (req.body.autoTime && req.body.autoTime != doc.autoTime) {
                                doc.autoTime = parseInt(req.body.autoTime);
                                modified = true;
                            }
                            if (req.body.sprinkleOn != doc.sprinkleOn) {
                                doc.sprinkleOn = req.body.sprinkleOn;
                                modified = true;
                            }
                            if (modified) {
                                that.db.updateSprinkler(req.params.circleId, doc).then((doc) => {
                                    winston.info("Sprinkler with id " + req.params.circleId + " is updated in database!", doc);
                                    res.status(200);
                                    res.send(doc);
                                }).catch(err => {
                                    winston.error("Error updating sprinkler with id " + req.params.circleId, err);
                                    res.status(500);
                                    res.send({ message: err });
                                });
                            } else {
                                res.status(200);
                                res.send({ "message": "Nothing changed" });
                            }
                        }
                    }).catch(err => {
                        winston.error("Error reading sprinkler with id " + req.params.circleId + " from database", err);
                        res.status(500);
                        res.send({ message: err });
                    });
            })
            .delete((req, res) => {
                //Delete
                that.db.deleteSprinkler(req.params.circleId).then(deleted => {
                    if (deleted) {
                        winston.info("Sprinkler with id " + req.params.circleId + " has been deleted!");
                        res.sendStatus(200);
                    } else {
                        winston.error("The sprinkler with id " + req.params.circleId + " wasnt deleted from database", err);
                        res.sendStatus(500);
                        res.send({ message: "No sprinkler was deleted!" });
                    }
                }).catch(err => {
                    winston.error("Error deleting sprinkler with id " + req.params.circleId, err);
                    res.status(500);
                    res.send({ message: err });
                });
            });
    }
}

module.exports = Routes;