class LoggingRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    return this.db.logging.create(dto, { raw: true });
  }

  async findAll({ offset, limit }) {
    return this.db.logging.findAll({ order: [['createdAt', 'DESC']], offset, limit, raw: true });
  }
}

module.exports = LoggingRepository;