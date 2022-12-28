const Exception = require("./exception");

class InternalServerError extends Exception {
  status = 500;

  constructor(message) {
    super(message ?? 'Internal server error');

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

module.exports = InternalServerError;