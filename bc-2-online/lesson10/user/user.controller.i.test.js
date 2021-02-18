const request = require('supertest');
const app = require('../app');

describe('Should test /users api', () => {
  describe('Should test GET /users route', () => {
    it('Should test that without token 401 status code is returned', async () => {
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(401);
    });
    it('Should test that on success status code 200 is returned', async () => {
      const response = await request(app)
        .get('/users')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDI0MmJmZDk4ZmM3ZGNlYjcyZjdkZmQiLCJpYXQiOjE2MTI5ODMzNzZ9.3AIvEJoaS1fMhYJWjDnewRqwfHxG4XKyS3fdRtbGO3o'
        );
      expect(response.statusCode).toBe(200);
    });

    it('Should test that /users return data', async () => {
      const response = await request(app)
        .get('/users/60242bfd98fc7dceb72f7dfd')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDI0MmJmZDk4ZmM3ZGNlYjcyZjdkZmQiLCJpYXQiOjE2MTI5ODMzNzZ9.3AIvEJoaS1fMhYJWjDnewRqwfHxG4XKyS3fdRtbGO3o'
        );
      expect(response.body.email).toBe('arnold@gmail.com');
    });
  });
});
