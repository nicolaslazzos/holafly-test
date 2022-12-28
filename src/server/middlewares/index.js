const loggingMiddleware = require('./loggingMiddleware');

const applyMiddlwares = (server, app) => {
    server.use(loggingMiddleware(app));
	return server;
};

module.exports = applyMiddlwares;