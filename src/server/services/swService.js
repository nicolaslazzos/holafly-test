const SwPeopleRepository = require("../../app/db/repositories/swPeopleRepository");
const SwPlanetRepository = require("../../app/db/repositories/swPlanetRepository");
const SwPeopleEntity = require("../../app/db/entities/swPeople");
const SwPlanetEntity = require("../../app/db/entities/swPlanet");

class SwService {
  constructor(app) {
    this.app = app;
    this.swPeopleRepository = new SwPeopleRepository(this.app.db);
    this.swPlanetRepository = new SwPlanetRepository(this.app.db);
  }

  async callApi(url, method = 'GET', body = null) {
    const options = { method: method };

    if (body) options.body = body;

    const response = await fetch(`https://swapi.dev/api${url}`, options);
    const data = await response.json();

    return { status: response.status, data };
  };

  async createPeople(dto) {
    const { id, name, mass, height, homeworld_name, homeworld_id } = dto;

    return this.swPeopleRepository.create({ id, name, mass: parseFloat(mass), height: parseFloat(height), homeworld_name, homeworld_id });
  }

  async getPeople(id) {
    const people = await this.swPeopleRepository.findById(id);

    if (people) return people;

    const { status, data } = await this.callApi(`/people/${id}`);

    if (status !== 200) return null;

    const planetId = this.app.utils.getIdFromString(data.homeworld);

    const planet = await this.getPlanet(planetId);

    return this.createPeople({ id, ...data, homeworld_id: `/planets/${planetId}`, homeworld_name: planet.name });
  }

  async createPlanet(dto) {
    const { id, name, gravity } = dto;

    return this.swPlanetRepository.create({ id, name, gravity: parseFloat(gravity) });
  }

  async getPlanet(id) {
    const planet = await this.swPlanetRepository.findById(id);

    if (planet) return planet;

    const { status, data } = await this.callApi(`/planets/${id}`);

    if (status !== 200) return null;

    return this.createPlanet({ id, ...data, gravity: this.app.utils.getFloatFromString(data.gravity) });
  }

  async getWeightOnPlanet(peopleId, planetId) {
    const people = await this.getPeople(peopleId);
    const planet = await this.getPlanet(planetId);

    if (this.app.utils.getIdFromString(people.homeworld_id) == planetId) throw new Error();

    return { mass: people.mass, gravity: planet.gravity, weight: people.mass * planet.gravity };
  }
}

module.exports = SwService;