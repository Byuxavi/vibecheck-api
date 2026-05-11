const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/connection');

describe('Pruebas de la colección Users', () => {
  
  beforeAll((done) => {
    mongodb.initDb((err) => {
      done();
    });
  });

  // Test 3: GET de todos los usuarios
  it('Debe obtener la lista de usuarios y devolver status 200', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 4: Una ruta que no existe (Manejo de errores 404)
  it('Debe devolver 404 si la ruta no existe', async () => {
    const res = await request(app).get('/not-found-route');
    expect(res.statusCode).toEqual(404);
  });
});