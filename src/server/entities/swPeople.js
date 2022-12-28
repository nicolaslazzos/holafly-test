class SwPeopleEntity {
  constructor({ name, mass, height, homeworld_name, homeworld_id }) {
    Object.assign(this, { name, mass, height, homeworld_name, homeworld_id });
  }
}

module.exports = SwPeopleEntity;