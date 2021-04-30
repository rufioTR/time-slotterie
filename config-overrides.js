const { config } = require("@react-spring/core");
const path = require("path");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, _env) {
    config.resolve.alias = {
      "@root": path.resolve(__dirname, "src"),
    };

    return config;
  },

  jest: function (config) {
    config.moduleNameMapper = Object.assign(config.moduleNameMapper, {
      "^@root(.*)$": "<rootDir>/src/$1",
    });

    return config;
  },
};
