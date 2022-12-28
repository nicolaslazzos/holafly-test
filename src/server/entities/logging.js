class LoggingEntity {
  constructor({ ip, header, action }) {
    Object.assign(this, { ip, header, action });
  }
}

module.exports = LoggingEntity;