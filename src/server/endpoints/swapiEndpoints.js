const { getRandomId } = require('../utils/functions');

const applySwapiEndpoints = (server, app) => {
    server.get('/hfswapi/test', async (req, res) => {
        const { data } = await app.swapiFunctions.genericRequest('https://swapi.dev/api/', 'GET', null, true);
        res.send(data);
    });

    server.get('/hfswapi/getPeople/:id', async (req, res) => {
        try {
            const people = await app.services.swService.getPeople(req.params.id);

            if (!people) res.status(404).send(`People with ID ${req.params.id} not found.`);

            res.status(200).send(people);
        } catch (e) {
            res.status(500).send('Internal server error');
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res) => {
        try {
            const planet = await app.services.swService.getPlanet(req.params.id);

            if (!planet) res.status(404).send(`Planet with ID ${req.params.id} not found.`);

            res.status(200).send(planet);
        } catch (e) {
            res.status(500).send('Internal server error');
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res) => {
        try {
            const peopleId = req.query.peopleId ?? getRandomId();
            const planetId = req.query.planetId ?? getRandomId();

            const weight = await app.services.swService.getWeightOnPlanet(peopleId, planetId);

            res.status(200).send({ weight });
        } catch (e) {
            res.status(500).send('Internal server error');
        }
    });

    server.get('/hfswapi/getLogs', async (req, res) => {
        const data = await app.db.logging.findAll();
        res.send(data);
    });

};

module.exports = applySwapiEndpoints;