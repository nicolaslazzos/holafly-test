const fetch = require('node-fetch');

const getWeightOnPlanet = (mass, gravity) => {
    return mass * gravity;
};

const genericRequest = async (url, method = 'GET', body = null, logging = false) => {
    let options = {
        method: method
    };
    if (url.indexOf('https://') < 0) {
        url = 'https://swapi.dev/api' + url;
    }
    if (body) {
        options.body = body;
    }
    const response = await fetch(url, options);
    const data = await response.json();
    if (logging) {
        console.log(data);
    }
    return { status: response.status, data };
};

module.exports = {
    getWeightOnPlanet,
    genericRequest
};