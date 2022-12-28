const loggingMiddleware = (app) =>
    (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const header = JSON.stringify(req.headers);
        const action = req.originalUrl;
        app.services.loggingService.createLog({ ip, header, action }).then().catch();
        next();
    };

module.exports = loggingMiddleware;