const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/connection');

describe('Pruebas de la colección Goals', () => {
  beforeAll((done) => {
    mongodb.initDb((err) => {
      done();
    });
  });

  it('Debe obtener la lista de metas y devolver status 200', async () => {
    const res = await request(app).get('/goals');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});