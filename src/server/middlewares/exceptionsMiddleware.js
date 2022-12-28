const { Exception, InternalServerError } = require('../errors');

function exceptionsHandler(err, req, res, next) {
  err = err instanceof Exception ? err : new InternalServerError();

  res.status(err.status).send({ error: err.message });
};

module.exports = exceptionsHandler;