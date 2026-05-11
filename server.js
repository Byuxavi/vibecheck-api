require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 8080;

// Configuración de Middlewares
app
  .use(cors()) 
  .use(bodyParser.json()) 
  .use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/', require('./routes')); 

// --- CAMBIO AQUÍ PARA LOS TESTS ---
// Solo encendemos el servidor si NO estamos en modo de prueba (test)
if (process.env.NODE_ENV !== 'test') {
  mongodb.initDb((err) => {
    if (err) {
      console.log('❌ Error al conectar a la BD:', err);
    } else {
      app.listen(port, () => {
        console.log(`🚀 Connected to DB and listening on ${port}`);
      });
    }
  });
}

// Exportamos app para que Supertest pueda usarlo
module.exports = app;