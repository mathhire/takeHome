const helmet = require("helmet"); // For security
const compression = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());
};
