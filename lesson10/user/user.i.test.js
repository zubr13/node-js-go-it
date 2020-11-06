const request = require('supertest');
const express = require('express');
// const app = require('../app');

const app = express();

app.get('/users', (req, res) => {
    res.json({ users: []});
});

describe('GET /users', () => {
    it('Should return 200 code', async () => {
        const response = await request(app).get('/users');

        expect(response.statusCode).toBe(200);
    })

    // it('Should return array of users', async () => {
    //     const response = await request(app).get('/user/5fa445c199bd7a4a108f78ec');
    //     console.log('response', response);

    //     expect(response.body).toEqual({
    //         name: 'John',
    //         email: 'john@gmail.com',
    //     });
    // })
});