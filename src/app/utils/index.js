function getRandomId(min = 0, max = 50) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getIdFromString(str) {
  return +str.match(/\d+/)[0];
}

function getFloatFromString(str) {
  return +str.match(/[+-]?\d+(\.\d+)?/g)[0];
}

module.exports = { getRandomId, getIdFromString, getFloatFromString };