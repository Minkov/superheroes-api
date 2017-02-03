/* globals require console */

const DbConfig = require("./config/db.config");
const Data = require("./data/data");
const Application = require("./application");

const { connectionString, port } = require("./config");

let db = null;
let data = null;
let app = null;
let routers = null;

DbConfig.initDb(connectionString)
    .then(dbObj => {
        db = dbObj;
        data = new Data(db);
        routers = require("./routers")
            .init(data);

        app = new Application(data, routers);
        app.start(port)
            .then(() => console.log(`App running at ${port}`));
    });