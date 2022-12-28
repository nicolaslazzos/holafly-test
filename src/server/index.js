const express = require('express');
const applyEndpoints = require('./endpoints');
const applyMiddlewares = require('./middlewares');
const applyServices = require('./services');

const createExpressServer = async app => {
	const server = express();
	applyMiddlewares(server, app);
	applyEndpoints(server, app);
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