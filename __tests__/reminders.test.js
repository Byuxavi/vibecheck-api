const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/connection');

describe('Pruebas de la colección Reminders', () => {
  beforeAll((done) => {
    mongodb.initDb((err) => {
      done();
    });
  });

  it('Debe obtener la lista de recordatorios y devolver status 200', async () => {
    const res = await request(app).get('/reminders');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});