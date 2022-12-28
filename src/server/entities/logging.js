class LoggingEntity {
  constructor({ id, ip, header, action }) {
    Object.assign(this, { id, ip, header, action });
  }
}

module.exports = LoggingEntity;