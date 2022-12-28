const express = require('express');
const applyEndpoints = require('./endpoints');
const applyMiddlewares = require('./middlewares');
const applyServices = require('./services');

const createExpressServer = async app => {
	const server = express();

	applyEndpoints(server, app);
	applyMiddlewares(server, app); // apply last, because of the error handler
	applyServices(app);

	await app.db.initDB();
	await app.db.populateDB();

	server.get('/', async (req, res) => {
		if (process.env.NODE_ENV === 'develop') {
			res.send('Test Enviroment');
		} else {
			res.sendStatus(200);
		}
	});

	return server;
};

module.exports = createExpressServer;