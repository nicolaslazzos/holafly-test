const SwPlanetEntity = require("../entities/swPlanet");

class SwPlanetRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    const planet = await this.db.swPlanet.create(dto, { raw: true });

    return planet ? new SwPlanetEntity(planet) : null;
  }

  async findById(id) {
    const planet = await this.db.swPlanet.findByPk(id, { raw: true });

    return planet ? new SwPlanetEntity(planet) : null;
  }
}

module.exports = SwPlanetRepository;