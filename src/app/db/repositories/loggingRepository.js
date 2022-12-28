const LoggingEntity = require("../entities/logging");

class LoggingRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    const log = await this.db.logging.create(dto, { raw: true });

    return log ? new LoggingEntity(log) : null;
  }

  async findAll({ offset, limit }) {
    const logs = await this.db.logging.findAll({ order: [['createdAt', 'DESC']], offset, limit, raw: true });

    return logs.map(log => new LoggingEntity(log));
  }
}

module.exports = LoggingRepository;