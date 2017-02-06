/* globals module require Promise */
const express = require("express"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    morgan = require("morgan");

class Application {
    constructor(data, routers) {
        this.data = data;
        this.routers = routers;
        this.init();
    }

    init() {
        this.app = express();
        this.app.use(morgan("combined"));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(this.routers);
    }

    start(port) {
        return new Promise(resolve => {
            this.server = this.app.listen(port, () => {
                resolve();
            });
        });
    }

    stop() {
        return new Promise(resolve => {
            this.server.close();
            resolve();
        });
    }
}

module.exports = Application;