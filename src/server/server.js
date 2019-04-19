/* eslint-disable no-console */
'use strict';

const Hapi = require('hapi');
const { JWT_SECRET }  = require('../constant');
const { validate } = require('./../middleware/jwt');
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
      validate: {
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  });
  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt',
    { key: JWT_SECRET,
      validate: await validate,
      verifyOptions: {
        ignoreExpiration: true,
        algorithms: [ 'HS256' ],
      },
    });

  server.auth.default('jwt');
  require('./../database/index')(server);
  await server.start();
  console.log('Server running on %ss', server.info.uri);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

module.exports = {
  init,
};
