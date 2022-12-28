const loggingMiddleware = require('./loggingMiddleware');
const exceptionsMiddleware = require('./exceptionsMiddleware');

const applyMiddlwares = (server, app) => {
    server.use(loggingMiddleware(app));
    server.use(exceptionsMiddleware);
};

module.exports = applyMiddlwares;