const request = require('supertest');
const app = require('../app'); // Import the Express app
const db = require('../models'); // Import the database models

// Runs before all tests in this file
beforeAll(async () => {
  await db.sequelize.sync({ force: true }); // Recreate the database schema
});

describe('Auth Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register') // Endpoint for user registration
      .send({
        username: 'testuser',
        password: 'password',
      });
    expect(res.statusCode).toEqual(201); // Expect HTTP status 201 (Created)
    expect(res.body).toHaveProperty('user'); // Expect response to have 'user' property
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login') // Endpoint for user login
      .send({
        username: 'testuser',
        password: 'password',
      });
    expect(res.statusCode).toEqual(200); // Expect HTTP status 200 (OK)
    expect(res.body).toHaveProperty('token'); // Expect response to include a JWT token
  });
});
