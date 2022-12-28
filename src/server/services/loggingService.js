const LoggingRepository = require("../../app/db/repositories/loggingRepository");
const LoggingEntity = require("../../app/db/entities/logging");

class LoggingService {
  constructor(app) {
    this.app = app;
    this.loggingRepository = new LoggingRepository(this.app.db);
  }

  async createLog(dto) {
    const { id, action, header, ip } = dto;

    const log = this.loggingRepository.create({ id, action, header, ip });

    return new LoggingEntity(log);
  }

  async findAll({ page, quantity }) {
    const logs = await this.loggingRepository.findAll({ limit: quantity, offset: page * quantity });

    return logs.map(log => new LoggingEntity(log));
  }
}

module.exports = LoggingService;