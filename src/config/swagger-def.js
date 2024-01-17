const config = require('../config/config');
const { version } = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Music Library System Backend API documentation',
    version, 
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}/api`,
    },
  ],
};

module.exports = swaggerDef;