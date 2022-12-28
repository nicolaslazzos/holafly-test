const Exception = require("./exception");

class NotFoundException extends Exception {
  status = 404;

  constructor(message) {
    super(message ?? 'Resource not found');

    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

module.exports = NotFoundException;