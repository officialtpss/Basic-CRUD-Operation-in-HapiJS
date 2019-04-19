'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const {getErrorMessage} = require('./../handler/error.handler');
const user = mongoose.model('users');
const { getAccessToken } = require('./../middleware/jwt');
const users = mongoose.model('users');
const create = async (req, reply) => {
  const doc = new user(req.payload);
  try {
    await doc.save();
    return reply.response({ok: 1}).code(201);
  } catch(e) {
    return reply.response({
      message : getErrorMessage(e),
    }).code(400);
  }
};

const login = async (req, reply) => {
  try {
    const data = await users.findOne(req.payload, { email: 1}).exec();
    if(!data) {
      return reply.response({message: 'invalid email or password'}).code(400);
    }else {
      return {token: await getAccessToken(data.email)};
    }
  } catch(e) {
    return reply.response({
      message : getErrorMessage(e),
    }).code(400);
  }
};


const getUser = async (req, reply) => {
  try {
    const data = await users.findOne({ email: req.user },{ password: 0 }).exec();
    return data;
  } catch(e) {
    return reply.response({
      message : getErrorMessage(e),
    }).code(400);
  }
};

const updateUser = async (req, reply) => {
  try {
    await users.updateOne({ email: req.user },req.payload).exec();
    return { ok :1};
  } catch(e) {
    return reply.response({
      message : getErrorMessage(e),
    }).code(400);
  }
};

const deleteUser = async (req, reply) => {
  try {
    await users.deleteOne({ email: req.user }).exec();
    return { ok :1};
  } catch(e) {
    return reply.response({
      message : getErrorMessage(e),
    }).code(400);
  }
};

module.exports = {
  create,
  login,
  getUser,
  updateUser,
  deleteUser,
};