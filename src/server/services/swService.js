const SwPeopleRepository = require("../../app/db/repositories/swPeopleRepository");
const SwPeopleEntity = require("../entities/swPeople");

class SwService {
  constructor(app) {
    this.app = app;
    this.swPeopleRepository = new SwPeopleRepository(this.app.db);
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
}

module.exports = SwService;