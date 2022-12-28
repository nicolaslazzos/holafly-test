const applySwapiEndpoints = require('./swapiEndpoints');

const applyEndpoints = (server, app) => {
	applySwapiEndpoints(server, app);
};

module.exports = applyEndpoints;