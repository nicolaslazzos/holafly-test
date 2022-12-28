const applySwapiEndpoints = (server, app) => {
    server.get('/hfswapi/test', async (req, res) => {
        try {
            const { data } = await app.services.swService('/', 'GET',
                null, true);
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send('Internal server error');
        }
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
            const peopleId = req.query.peopleId ?? app.utils.getRandomId();
            const planetId = req.query.planetId ?? app.utils.getRandomId();

            const result = await app.services.swService.getWeightOnPlanet(peopleId, planetId);

            res.status(200).send(result);
        } catch (e) {
            res.status(500).send('Internal server error');
        }
    });

    server.get('/hfswapi/getLogs', async (req, res) => {
        try {
            const { page, quantity } = { page: 0, quantity: 20, ...req.query };

            const logs = await app.services.loggingService.findAll({ page, quantity });

            res.status(200).send({ docs: logs, page: +page, quantity: +quantity });
        } catch (e) {
            res.status(500).send('Internal server error');
        }
    });

};

module.exports = applySwapiEndpoints;