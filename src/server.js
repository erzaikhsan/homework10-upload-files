const express = require("express");
const { appConfig } = require("./config");
const { morganMiddleware, errorHandler} = require("./middlewares");
const routes = require("./routes");
const path = require("path");

function createServer() {
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morganMiddleware);
    app.use(`/${appConfig.API}`, routes);
    app.use(errorHandler);
    app.use('/upload',express.static(path.join(__dirname, 'upload')));

    return app;
}

module.exports = createServer;