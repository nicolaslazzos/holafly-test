const SwPeopleRepository = require("../../app/db/repositories/swPeopleRepository");
const SwPlanetRepository = require("../../app/db/repositories/swPlanetRepository");
const SwPeopleEntity = require("../entities/swPeople");
const SwPlanetEntity = require("../entities/swPlanet");

const { getIdFromString } = require('../utils/functions');

class SwService {
  constructor(app) {
    this.app = app;
    this.swPeopleRepository = new SwPeopleRepository(this.app.db);
    this.swPlanetRepository = new SwPlanetRepository(this.app.db);
  }

  async createPeople(dto) {
    const { id, name, mass, height, homeworld_name, homeworld_id } = dto;

    const people = await this.swPeopleRepository.create({ id, name, mass: parseFloat(mass), height: parseFloat(height), homeworld_name, homeworld_id });

    return new SwPeopleEntity(people);
  }

  async getPeople(id) {
    let people = await this.swPeopleRepository.findById(id);

    if (!people) {
      const { status, data } = await this.app.swapiFunctions.genericRequest(`/people/${id}`);

      if (status !== 200) return null;

      const planetId = getIdFromString(data.homeworld);

      const planet = await this.getPlanet(planetId);

      people = await this.createPeople({ id, ...data, homeworld_id: `/planets/${planetId}`, homeworld_name: planet.name });
    }

    return new SwPeopleEntity(people);
  }

  async createPlanet(dto) {
    const { id, name, gravity } = dto;

    const planet = await this.swPlanetRepository.create({ id, name, gravity: parseFloat(gravity) });

    return new SwPlanetEntity(planet);
  }

  async getPlanet(id) {
    let planet = await this.swPlanetRepository.findById(id);

    if (!planet) {
      const { status, data } = await this.app.swapiFunctions.genericRequest(`/planets/${id}`);

      if (status !== 200) return null;

      planet = await this.createPlanet({ id, ...data, gravity: data.gravity.split(' ')[0] });
    }

    return new SwPlanetEntity(planet);
  }

  async getWeightOnPlanet(peopleId, planetId) {
    const people = await this.getPeople(peopleId);
    const planet = await this.getPlanet(planetId);

    if (getIdFromString(people.homeworld_id) == planetId) throw new Error();

    return this.app.swapiFunctions.getWeightOnPlanet(people.mass, planet.gravity);
  }
}

module.exports = SwService;