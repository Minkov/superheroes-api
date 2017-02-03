/* globals require module __dirname */

const fs = require("fs"),
    path = require("path");

const express = require("express");

module.exports = {
    init(data) {
        let masterRouter = new express.Router();
        fs.readdirSync(__dirname)
            .filter(file => file.includes("router"))
            .forEach(file => {
                let RouterClass = require(path.join(__dirname, file));
                let router = new RouterClass(data);
                router.attachToMaster(masterRouter);
            });
        return masterRouter;
    }
};