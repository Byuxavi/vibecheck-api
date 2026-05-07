const swaggerAutogen = require('swagger-autogen')();

// Render define RENDER_EXTERNAL_HOSTNAME automáticamente en sus servidores
const host = process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:8080';

// Si estamos en Render, usamos HTTPS. Si no, HTTP.
const schemes = process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http'];

const doc = {
  info: {
    title: 'VibeCheck: Wellness & Habit Tracker API',
    description: 'API para la gestión de hábitos y bienestar personal',
  },
  host: host,
  schemes: schemes, 
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);