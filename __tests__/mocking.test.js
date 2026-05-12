const { createUser } = require('../controllers/users');
const mongodb = require('../db/connection');

// 1. EL SECUESTRO: Reemplazamos el módulo real por uno de mentira
jest.mock('../db/connection');

describe('Experimento de Mocking con Users', () => {
  it('Debe simular que guarda un usuario exitosamente', async () => {
    
    // 2. LA PROMESA FALSA: Definimos qué devuelve el insertOne
    const mockInsertOne = jest.fn().mockResolvedValue({ acknowledged: true });

    // 3. LA ESTRUCTURA: Simulamos cómo el controlador navega por la DB
    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          insertOne: mockInsertOne
        })
      })
    });

    // 4. OBJETOS DE EXPRESS: Simulamos req (entrada) y res (salida)
    const req = {
      body: {
        firstName: 'Javier',
        lastName: 'Mock',
        email: 'mock@test.com',
        favoriteColor: 'Azul'
      }
    };

    // Usamos jest.fn() para "espiar" si el controlador envía el status correcto
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // 5. LA EJECUCIÓN: Llamamos a la función real
    await createUser(req, res);

    // 6. LA VERIFICACIÓN: ¿El controlador se portó bien?
    // Verificamos si llamó al status 201
    expect(res.status).toHaveBeenCalledWith(201);
    
    // Verificamos si intentó usar la base de datos
    expect(mockInsertOne).toHaveBeenCalled();
    
    console.log('¡Test con Mocking completado con éxito! No se guardó nada en la DB real.');
  });
});