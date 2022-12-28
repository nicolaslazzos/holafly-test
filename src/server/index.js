const express = require('express');
const applyEndpoints = require('./endpoints');
const applyServices = require('./services');
const { applyMiddlewares, applyErrorMiddlwares } = require('./middlewares');

const createExpressServer = async app => {
	const server = express();

	applyMiddlewares(server, app);
	applyEndpoints(server, app);
	applyServices(server, app);
	applyErrorMiddlwares(server, app);

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