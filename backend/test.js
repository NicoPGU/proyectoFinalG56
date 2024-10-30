const request = require('supertest');
const app = require('./index');
let server;


beforeAll((done) => {
   
    server = app.listen(PORT, () => {
        done();
    });
});

afterAll((done) => {
   
    server.close(done);
});

describe('API Routes Testing - Status Codes', () => {
    test('GET /api/properties/propiedades - should return 200 for public properties', async () => {
        const response = await request(app).get('/api/properties/propiedades');
        expect(response.statusCode).toBe(200);
    });

    test('GET /api/users/me - should return 403 if no token is provided', async () => {
        const response = await request(app).get('/api/users/me');
        expect(response.statusCode).toBe(403);
    });

    test('POST /api/users/register - should return 201 on successful user registration', async () => {
        const uniqueEmail = `testuser_${Date.now()}@example.com`;  // Define un email único
        const response = await request(app).post('/api/users/register').send({
            nombre: 'TestUser',
            email: uniqueEmail,
            password: 'TestPassword123'
        });
        expect(response.statusCode).toBe(201);
    });

    
    test('GET /api/properties/propiedades - should return 200 and a list of properties', async () => {
        const response = await request(app).get('/api/properties/propiedades');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);  
    });
});

