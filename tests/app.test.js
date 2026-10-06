const request = require('supertest');
const app = require('../app');

describe('Production API Endpoint Integration Tests', () => {

    test('GET /api/health should return status UP', async () => {
        const response = await request(app).get('/api/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('UP');
        expect(response.body).toHaveProperty('timestamp');
    });

    test('GET /api/items should return array of items', async () => {
        const response = await request(app).get('/api/items');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('POST /api/items should create new item given valid payload', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({ name: 'Docker Container' });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.data.name).toBe('Docker Container');
    });

    test('POST /api/items should fail when name is missing', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
    });
});
