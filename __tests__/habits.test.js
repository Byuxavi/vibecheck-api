const request = require('supertest');
const app = require('../server');
const mongodb = require('../db/connection');

describe('Pruebas de la colección Habits', () => {
  
  // SOLUCIÓN: Esperar a que la DB conecte antes de correr los tests
  beforeAll((done) => {
    mongodb.initDb((err) => {
      if (err) {
        console.log(err);
        done();
      } else {
        done();
      }
    });
  });

  it('Debe obtener la lista de hábitos y devolver un status 200', async () => {
    const res = await request(app).get('/habits');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Debe fallar al buscar un ID que no existe', async () => {
    const res = await request(app).get('/habits/12345');
    expect(res.statusCode).not.toBe(200);
  });
});
// Cerrar procesos pendientes
  afterAll(done => {
    // Si tienes un método para cerrar la conexión úsalo, 
    // si no, esto ayuda a limpiar el proceso de Jest
    done();
  });