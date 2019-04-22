'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const { getErrorMessage } = require('./../handler/error.handler');
const user = mongoose.model('users');
const { getAccessToken } = require('./../middleware/jwt');

// create new user
const create = async (req, reply) => {
  const doc = new user(req.payload);
  try {
    await doc.save();
    return reply.response({ ok: 1 }).code(201);
  } catch (e) {
    return reply.response({
      message: getErrorMessage(e),
    }).code(400);
  }
};

// login user
const login = async (req, reply) => {
  try {
    const data = await user.findOne(req.payload, { email: 1 }).exec();
    if (!data) {
      return reply.response({ message: 'invalid email or password' }).code(400);
    } else {
      return { token: await getAccessToken(data.email) };
    }
  } catch (e) {
    return reply.response({
      message: getErrorMessage(e),
    }).code(400);
  }
};

// get information of user
const getUser = async (req, reply) => {
  try {
    const data = await user.findOne({ _id: req.userId }, { password: 0 }).exec();
    return data;
  } catch (e) {
    return reply.response({
      message: getErrorMessage(e),
    }).code(400);
  }
};

// update user information
const updateUser = async (req, reply) => {
  try {
    await user.updateOne({ _id: req.userId }, req.payload).exec();
    return { ok: 1 };
  } catch (e) {
    return reply.response({
      message: getErrorMessage(e),
    }).code(400);
  }
};

// delete user
const deleteUser = async (req, reply) => {
  try {
    await user.deleteOne({ _id: req.userId }).exec();
    return { ok: 1 };
  } catch (e) {
    return reply.response({
      message: getErrorMessage(e),
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