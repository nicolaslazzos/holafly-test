const SwPeopleEntity = require("../entities/swPeople");

class SwPeopleRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    const people = await this.db.swPeople.create(dto, { raw: true });

    return people ? new SwPeopleEntity(people) : null;
  }

  async findById(id) {
    const people = await this.db.swPeople.findByPk(id, { raw: true });

    return people ? new SwPeopleEntity(people) : null;
  }
}

module.exports = SwPeopleRepository;