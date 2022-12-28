const SwService = require("./swService");
const LoggingService = require("./loggingService");

const applyServices = (app) => {
  app.services = {
    swService: new SwService(app),
    loggingService: new LoggingService(app)
  };
};

module.exports = applyServices;