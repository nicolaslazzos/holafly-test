class SwPeopleEntity {
  constructor({ id, name, mass, height, homeworld_name, homeworld_id }) {
    Object.assign(this, { id, name, mass, height, homeworld_name, homeworld_id });
  }
}

module.exports = SwPeopleEntity;