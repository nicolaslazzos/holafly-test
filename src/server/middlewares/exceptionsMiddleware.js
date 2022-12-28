const { Exception } = require('../errors');

function exceptionsHandler(err, req, res, next) {
  if (err instanceof Exception) return res.status(err.status).send({ error: err.message });

  res.status(500).send({ error: 'Internal server error' });
};

module.exports = exceptionsHandler;