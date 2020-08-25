// configs/session.config.js

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


module.exports = app => {
  
  app.use(
    session({
      
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 300000 // 300 * 1000 ms === 5 min
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        // ttl => time to live
        ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      })
    })
  );
};