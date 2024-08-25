const request = require('supertest');
const app = require('../app');
const db = require('../models');

let token;

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({ username: 'testuser', password: 'password' });
  const loginRes = await request(app)
    .post('/api/auth/login')
    .send({ username: 'testuser', password: 'password' });
  token = loginRes.body.token;
});

describe('Task Routes', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('task');
  });

  it('should get tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.tasks).toHaveLength(1);
  });

  // Additional tests for update and delete
});