'use strict';
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constant/index');
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const validate = async (decoded, request) => {
  const users = mongoose.model('users');
  const data = await users.findOne({ email: decoded },{ _id: 1 }).exec();
  if(data) {
    request.user = decoded;
    return { isValid: true };
  }else {
    return { isValid: false };
  }

};
const getAccessToken =  (user) => {
  return jwt.sign(user, JWT_SECRET, {algorithm:  'HS256'});
};

module.exports = {
  validate,
  getAccessToken,
};