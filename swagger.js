const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'VibeCheck: Wellness & Habit Tracker API',
    description: 'API para la gestión de hábitos y bienestar personal',
  },
  // Cambia esto por tu URL de Render cuando la tengas
  host: process.env.HOST || 'localhost:8080',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generar el archivo swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);