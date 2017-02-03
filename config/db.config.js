/* globals require module */

const MongoClient = require("mongodb").MongoClient;

class DbConfig {
    static initDb(connectionString) {
        return MongoClient.connect(connectionString);
    }
}

module.exports = DbConfig;