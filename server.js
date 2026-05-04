require('dotenv').config(); // 1. Cargar las variables de entorno primero que nada
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
const cors = require('cors');
const session = require('express-session'); // El carnet
const passport = require('passport'); // El recepcionista (lo configuraremos en middleware)

const app = express();
const port = process.env.PORT || 8080;

app
  .use(cors())
  .use(bodyParser.json())
  .use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize()) // Activar recepcionista
  .use(passport.session())    // Recordar carnet
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

// La lógica de encendido que ahora usa nuestro archivo db/connection.js
mongodb.initDb((err) => {
  if (err) {
    console.log('❌ Error al conectar a la BD:', err);
  } else {
    app.listen(port, () => {
      console.log(`🚀 Connected to DB and listening on ${port}`);
    });
  }
});