const swaggerAutogen = require('swagger-autogen')();

// 1. Usamos la variable de Render, pero si no existe, usamos localhost
let host = process.env.RENDER_EXTERNAL_HOSTNAME || process.env.HOST || 'localhost:8080';

// 2. LIMPIEZA: Si el host trae "https://" o "http://", se lo quitamos.
// Swagger necesita SOLO el dominio (ejemplo: vibecheck-api-gr31.onrender.com)
host = host.replace(/^https?:\/\//, ''); 

// 3. Definimos el esquema: Si estamos en la nube, forzamos HTTPS
const schemes = (process.env.RENDER_EXTERNAL_HOSTNAME || process.env.HOST?.includes('onrender')) 
  ? ['https'] 
  : ['http'];

const doc = {
  info: {
    title: 'VibeCheck: Wellness & Habit Tracker API',
    description: 'API para la gestión de hábitos y bienestar personal',
  },
  host: host, // Ahora siempre llegará limpio aquí
  schemes: schemes, 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);