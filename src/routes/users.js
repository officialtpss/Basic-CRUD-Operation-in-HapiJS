/* eslint-disable no-unused-vars */
'use strict';
const users = require('../modules/users');
const Joi = require('joi');

module.exports = async (server) => {
  server.route([
    {
      method: 'POST', path: '/v1/users', config: {
        auth: false,
        validate: {
          payload: {
            firstName: Joi.string().min(3).max(25).required(),
            lastName: Joi.string().min(3).max(25).required(),
            email: Joi.string().required(),
            password: Joi.string().min(4).max(15).required(),
          },
        },
        handler: users.create,
      },
    },
    {
      method: 'PUT', path: '/v1/users', config: {
        auth: false,
        validate: {
          payload: {
            email: Joi.string().required(),
            password: Joi.string().min(4).max(15).required(),
          },
        },
        handler: users.login,
      },
    },
    {
      method: 'PATCH', path: '/v1/users', config: {
        auth: 'jwt',
        validate: {
          payload: {
            firstName: Joi.string().min(3).max(25).required(),
            lastName: Joi.string().min(3).max(25).required(),
            password: Joi.string().min(4).max(15).optional(),
          },
        },
        handler: users.updateUser,
      },
    },
    {
      method: 'GET', path: '/v1/users', config: { auth: 'jwt' },
      handler: users.getUser,
    },
    {
      method: 'DELETE', path: '/v1/users', config: { auth: 'jwt' },
      handler: users.deleteUser,
    },
  ]);

};