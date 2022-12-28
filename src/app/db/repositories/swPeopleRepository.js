class SwPeopleRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    const people = await this.db.swPeople.create(dto);
    return people ? people.toJSON() : null;
  }

  async findById(id) {
    const people = await this.db.swPeople.findByPk(id);
    return people ? people.toJSON() : null;
  }
}

module.exports = SwPeopleRepository;