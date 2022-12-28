const SwPeopleRepository = require("../../app/db/repositories/swPeopleRepository");
const SwPlanetRepository = require("../../app/db/repositories/swPlanetRepository");
const SwPeopleEntity = require("../entities/swPeople");
const SwPlanetEntity = require("../entities/swPlanet");

class SwService {
  constructor(app) {
    this.app = app;
    this.swPeopleRepository = new SwPeopleRepository(this.app.db);
    this.swPlanetRepository = new SwPlanetRepository(this.app.db);
  }

  async createPeople(dto) {
    const { id, name, mass, height, homeworld_name, homeworld_id } = dto;

    return this.swPeopleRepository.create({ id, name, mass: parseFloat(mass), height: parseFloat(height), homeworld_name, homeworld_id });
  }

  async getPeople(id) {
    let people = await this.swPeopleRepository.findById(id);

    if (!people) {
      const { status, data } = await this.app.swapiFunctions.genericRequest(`/people/${id}`, 'GET');

      if (status !== 200) return null;

      people = await this.createPeople({ id, ...data });
    }

    return new SwPeopleEntity(people);
  }

  async createPlanet(dto) {
    const { id, name, gravity } = dto;

    return this.swPlanetRepository.create({ id, name, gravity: parseFloat(gravity) });
  }

  async getPlanet(id) {
    let planet = await this.swPlanetRepository.findById(id);

    if (!planet) {
      const { status, data } = await this.app.swapiFunctions.genericRequest(`/planets/${id}`, 'GET');

      if (status !== 200) return null;

      planet = await this.createPlanet({ id, ...data, gravity: data.gravity.split(' ')[0] });
    }

    return new SwPlanetEntity(planet);
  }
}

module.exports = SwService;