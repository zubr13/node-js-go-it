const request = require('supertest');
const app = require('../app');

describe('GET /users', () => {
    it('responds with success status code', async () => {
        const result = await request(app)
            .get('/users')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDA3MjM5YmU4ZmExZmI5MjYzNmJmYzQiLCJpYXQiOjE2MTEwODM0MzV9.zF5RXLtd5Jd7Kvda3rsdHKLzwNJ2TblCYPhvGhTkjRE'
            );
        expect(result.statusCode).toBe(200);
    });
});

describe('GET /users/:id', () => {
    describe('has valid status codes', () => {
        it('responds with body and has name Michael', async () => {
            const result = await request(app)
                .get('/users/6009d377c624fd20323b5c9a')
                .set(
                    'Authorization',
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDA3MjM5YmU4ZmExZmI5MjYzNmJmYzQiLCJpYXQiOjE2MTEwODM0MzV9.zF5RXLtd5Jd7Kvda3rsdHKLzwNJ2TblCYPhvGhTkjRE'
                );
            expect(result.body.name).toBe('Michaellll');
        });
    })

    describe('has valid body', () => {
        it('responds with body and has name Michael', async () => {
            const result = await request(app)
                .get('/users/6009d377c624fd20323b5c9a')
                .set(
                    'Authorization',
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDA3MjM5YmU4ZmExZmI5MjYzNmJmYzQiLCJpYXQiOjE2MTEwODM0MzV9.zF5RXLtd5Jd7Kvda3rsdHKLzwNJ2TblCYPhvGhTkjRE'
                );
            expect(result.body.name).toBe('Michaellll');
        });
    })

    describe('check authorization', () => {
        it('responds with body and has name Michael', async () => {
            const result = await request(app)
                .get('/users/6009d377c624fd20323b5c9a')
                .set(
                    'Authorization',
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDA3MjM5YmU4ZmExZmI5MjYzNmJmYzQiLCJpYXQiOjE2MTEwODM0MzV9.zF5RXLtd5Jd7Kvda3rsdHKLzwNJ2TblCYPhvGhTkjRE'
                );
            expect(result.body.name).toBe('Michaellll');
        });
    })
});
