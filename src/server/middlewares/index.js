const loggingMiddleware = require('./loggingMiddleware');
const exceptionsMiddleware = require('./exceptionsMiddleware');

const applyMiddlewares = (server, app) => {
    server.use(loggingMiddleware(app));
};

const applyErrorMiddlwares = (server, app) => {
    server.use(exceptionsMiddleware);
};

module.exports = { applyMiddlewares, applyErrorMiddlwares };