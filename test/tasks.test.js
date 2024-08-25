const request = require('supertest');
const app = require('../app');
const db = require('../models'); 

let token; // Variable to store the JWT token for authentication

// Runs before all tests in this file
beforeAll(async () => {
  await db.sequelize.sync({ force: true }); 

  // Register and login a user to get a token
  await request(app)
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
      .set('Authorization', `Bearer ${token}`) // Set the authorization header
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        status: 'Todo',
        priority: 'High',
        dueDate: '2024-09-01',
      });
    expect(res.statusCode).toEqual(201); // Expect HTTP status 201 (Created)
    expect(res.body).toHaveProperty('task'); 
  });

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks') 
      .set('Authorization', `Bearer ${token}`); 
    expect(res.statusCode).toEqual(200); 
    expect(res.body.tasks).toHaveLength(1); 
  });

  it('should update a task', async () => {
    const task = await request(app)
      .get('/api/tasks') 
      .set('Authorization', `Bearer ${token}`);

    const taskId = task.body.tasks[0].id; // Extract the task ID

    const res = await request(app)
      .put(`/api/tasks/${taskId}`) // Endpoint for updating a task
      .set('Authorization', `Bearer ${token}`) // Set the authorization header
      .send({
        title: 'Updated Task',
        status: 'In Progress',
      });
    expect(res.statusCode).toEqual(200); // Expect HTTP status 200 (OK)
    expect(res.body.task.title).toEqual('Updated Task'); // Expect the task title to be updated
    expect(res.body.task.status).toEqual('In Progress'); // Expect the task status to be updated
  });

  it('should delete a task', async () => {
    const task = await request(app)
      .get('/api/tasks') // Get the task to delete
      .set('Authorization', `Bearer ${token}`);

    const taskId = task.body.tasks[0].id; // Extract the task ID

    const res = await request(app)
      .delete(`/api/tasks/${taskId}`) // Endpoint for deleting a task
      .set('Authorization', `Bearer ${token}`); // Set the authorization header
    expect(res.statusCode).toEqual(200); // Expect HTTP status 200 (OK)
    expect(res.body.message).toEqual('Task deleted successfully'); // Expect success message
  });
});
