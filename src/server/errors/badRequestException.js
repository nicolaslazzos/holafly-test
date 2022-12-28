const Exception = require("./exception");

class BadRequestException extends Exception {
  status = 400;

  constructor(message) {
    super(message ?? 'Bad request');

    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

module.exports = BadRequestException;