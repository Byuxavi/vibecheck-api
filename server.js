require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 8080;

// Configuración de Middlewares (La "Tubería")
app
  .use(cors()) // Gestión de permisos de acceso (CORS)
  .use(bodyParser.json()) // Traductor de JSON
  .use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/', require('./routes')); // Enrutador principal

// Inicialización de la Base de Datos y Encendido del Servidor
mongodb.initDb((err) => {
  if (err) {
    console.log('❌ Error al conectar a la BD:', err);
  } else {
    app.listen(port, () => {
      console.log(`🚀 Connected to DB and listening on ${port}`);
    });
  }
});