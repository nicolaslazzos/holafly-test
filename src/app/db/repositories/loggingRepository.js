class LoggingRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    const log = await this.db.logging.create(dto);
    return log ? log.toJSON() : null;
  }
}

module.exports = LoggingRepository;