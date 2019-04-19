'use strict';
module.exports = (app) => {
  const MONGO_URI = 'mongodb://localhost:27017/hapidemo';
  const mongoose = require('mongoose');
  mongoose.set('useCreateIndex', true);
  mongoose.connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
  }, (err) => {
    if (err) {
      throw (err);
    } else {
      require('./../models/index.js')(mongoose);
      require('./../routes/index.js')(app);
    }
  });
};