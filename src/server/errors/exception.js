class Exception extends Error {
  status;

  constructor(message) {
    super(message);

    Object.setPrototypeOf(this, Exception.prototype);
  }
}

module.exports = Exception;