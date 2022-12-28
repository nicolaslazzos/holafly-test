class SwPlanetRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    return this.db.swPlanet.create(dto, { raw: true });
  }

  async findById(id) {
    return this.db.swPlanet.findByPk(id, { raw: true });
  }
}

module.exports = SwPlanetRepository;