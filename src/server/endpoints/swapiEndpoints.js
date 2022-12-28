const applySwapiEndpoints = (server, app) => {
    server.get('/hfswapi/test', async (req, res, next) => {
        try {
            const { data } = await app.services.swService('/', 'GET', null, true);

            res.status(200).send(data);
        } catch (e) {
            next(e);
        }
    });

    server.get('/hfswapi/getPeople/:id', async (req, res, next) => {
        try {
            const people = await app.services.swService.getPeople(req.params.id);

            res.status(200).send(people);
        } catch (e) {
            next(e);
        }
    });

    server.get('/hfswapi/getPlanet/:id', async (req, res, next) => {
        try {
            const planet = await app.services.swService.getPlanet(req.params.id);

            res.status(200).send(planet);
        } catch (e) {
            next(e);
        }
    });

    server.get('/hfswapi/getWeightOnPlanetRandom', async (req, res, next) => {
        try {
            const peopleId = req.query.peopleId ?? app.utils.getRandomId();
            const planetId = req.query.planetId ?? app.utils.getRandomId();

            const result = await app.services.swService.getWeightOnPlanet(peopleId, planetId);

            res.status(200).send(result);
        } catch (e) {
            next(e);
        }
    });

    server.get('/hfswapi/getLogs', async (req, res, next) => {
        try {
            const { page, quantity } = { page: 0, quantity: 20, ...req.query };

            const logs = await app.services.loggingService.findAll({ page, quantity });

            res.status(200).send({ docs: logs, page: +page, quantity: +quantity });
        } catch (e) {
            next(e);
        }
    });

};

module.exports = applySwapiEndpoints;