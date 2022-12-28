class SwPeopleRepository {
  constructor(db) {
    this.db = db;
  }

  async create(dto) {
    return this.db.swPeople.create(dto, { raw: true });
  }

  async findById(id) {
    return this.db.swPeople.findByPk(id, { raw: true });
  }
}

module.exports = SwPeopleRepository;