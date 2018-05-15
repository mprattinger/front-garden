"use strict";

const path = require("path");
const nedb = require("nedb");

class DbService {

    constructor(rootPath) {
        this.dbPath = path.join(rootPath, "data", "sprinkler.db");
        this.db = new nedb({filename: this.dbPath, autoload: true});
    }

    getSprinklers(){
        var that = this;

        return new Promise(resolve => {
            that.db.find({}, (err, docs)=>{
                if(err) throw err;
                resolve(docs);
            });
        });
    }
    getSprinklerById(id){
        var that = this;
        return new Promise(resolve=>{
            that.db.findOne({"_id":id}, (err, doc)=>{
                if(err) throw err;
                resolve(doc);
            });
        });
    }
    getSprinklerByPin(pin){
        var that = this;
        return new Promise(resolve=>{
            that.db.findOne({"gpio":pin}, (err, doc)=>{
                if(err) throw err;
                resolve(doc);
            });
        });
    }

    addSprinkler(newSprinkler){
        var that = this;
        return new Promise(resolve => {
            that.db.insert(newSprinkler, (err, doc)=>{
                if(err) throw err;
                resolve(doc);
            });
        });
    }
    updateSprinkler(id, sprinkler){
        var that = this;
        return new Promise(resolve => {
            that.db.update({"_id": id}, sprinkler, {}, (err, no, ups)=>{
                if(err) throw err;
                resolve(sprinkler);
            });
        });
    }
    deleteSprinkler(id){
        var that = this;
        return new Promise(resolve => {
            that.db.remove({"_id": id}, (err, no)=>{
                if(err) throw err;
                
                if(no>0) resolve(true);
                else throw new Error("No sprinkler deleted!");
            });
        });
    }
}

module.exports = DbService;