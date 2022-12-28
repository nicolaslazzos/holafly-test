const SwService = require("./swService");
const LoggingService = require("./loggingService");

const applyServices = (server, app) => {
  app.services = {
    swService: new SwService(app),
    loggingService: new LoggingService(app)
  };
};

module.exports = applyServices;