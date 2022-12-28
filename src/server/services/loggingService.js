const LoggingRepository = require("../../app/db/repositories/loggingRepository");

class LoggingService {
  constructor(app) {
    this.app = app;
    this.loggingRepository = new LoggingRepository(this.app.db);
  }

  async createLog(dto) {
    const { id, action, header, ip } = dto;

    return this.loggingRepository.create({ id, action, header, ip });
  }

  async findAll({ page, quantity }) {
    return this.loggingRepository.findAll({ limit: quantity, offset: page * quantity });
  }
}

module.exports = LoggingService;