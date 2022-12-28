class SwPlanetRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    const planet = await this.db.swPlanet.create(dto);
    return planet ? planet.toJSON() : null;
  }

  async findById(id) {
    const planet = await this.db.swPlanet.findByPk(id);
    return planet ? planet.toJSON() : null;
  }
}

module.exports = SwPlanetRepository;