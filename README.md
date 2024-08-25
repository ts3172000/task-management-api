# Task Management API

This is a RESTful API for a task management system. The API supports user registration, authentication, task management (CRUD operations), task assignment, and filtering/searching tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the API](#running-the-api)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Project Structure](#project-structure)

## Features

- *User Registration and Authentication*: Register new users, log in, and receive JWT tokens for authenticated requests.
- *Task Management*: Create, read, update, and delete tasks.
- *Task Assignment*: Assign tasks to users.
- *Filtering and Searching*: Filter tasks by status, priority, and due date. Search tasks by title or description.

## Technologies Used

- *Node.js*: JavaScript runtime environment.
- *Express.js*: Web framework for Node.js.
- *Sequelize*: ORM for interacting with MySQL database.
- *MySQL*: Relational database management system.
- *JWT*: JSON Web Token for secure user authentication.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MySQL](https://www.mysql.com/) (version 5.7 or higher)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

## Installation

1. *Clone the Repository* (optional):
   bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   

2. *Install Dependencies*:
   bash
   npm install
   

3. *Set Up the MySQL Database*:
   - Create a new MySQL database (e.g., task_management_db).
   - Configure your database connection settings in the .env file.

## Configuration

1. *Create a .env File* in the root of your project:
   bash
   touch .env
   

2. *Add the following environment variables* to the .env file:

   plaintext
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=task_management_db
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   

   Replace the placeholders with your actual database credentials and desired JWT secret key.

## Running the API

1. *Migrate the Database*:
   bash
   npx sequelize-cli db:migrate
   

2. *Start the Server*:
   bash
   npx nodemon app.js
   

   The API should now be running on http://localhost:5000.

## API Endpoints

### 1. *User Registration*

- *Endpoint:* POST /api/users/register
- *Description:* Registers a new user.

### 2. *User Login*

- *Endpoint:* POST /api/users/login
- *Description:* Logs in an existing user and returns a JWT token.

### 3. *Create Task*

- *Endpoint:* POST /api/tasks
- *Description:* Creates a new task for the authenticated user.

### 4. *Get Tasks (with Filtering/Searching)*

- *Endpoint:* GET /api/tasks
- *Description:* Retrieves tasks for the authenticated user, with optional filtering and searching.

### 5. *Update Task*

- *Endpoint:* PUT /api/tasks/:id
- *Description:* Updates an existing task for the authenticated user.

### 6. *Delete Task*

- *Endpoint:* DELETE /api/tasks/:id
- *Description:* Deletes a task for the authenticated user.

## Usage Examples

### 1. *Register a New User*

- *Request*:
  http
  POST /api/users/register
  Content-Type: application/json

  {
    "username": "john_doe",
    "password": "password123"
  }
  

- *Response*:
  json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "username": "john_doe"
    }
  }
  

### 2. *Login*

- *Request*:
  http
  POST /api/users/login
  Content-Type: application/json

  {
    "username": "john_doe",
    "password": "password123"
  }
  

- *Response*:
  json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  

### 3. *Create a Task*

- *Request*:
  http
  POST /api/tasks
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

  {
    "title": "Complete API documentation",
    "description": "Write the API documentation for the task management system",
    "status": "Todo",
    "priority": "High",
    "dueDate": "2024-08-31"
  }
  

- *Response*:
  json
  {
    "message": "Task created successfully",
    "task": {
      "id": 1,
      "title": "Complete API documentation",
      "description": "Write the API documentation for the task management system",
      "status": "Todo",
      "priority": "High",
      "dueDate": "2024-08-31",
      "userId": 1,
      "createdAt": "2024-08-25T12:00:00.000Z",
      "updatedAt": "2024-08-25T12:00:00.000Z"
    }
  }
  

### 4. *Get Tasks*

- *Request*:
  http
  GET /api/tasks?status=In Progress
  Authorization: Bearer <JWT_TOKEN>
  

- *Response*:
  json
  [
    {
      "id": 2,
      "title": "Develop new feature",
      "description": "Work on the new feature for the app",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2024-08-30",
      "userId": 1,
      "createdAt": "2024-08-24T12:00:00.000Z",
      "updatedAt": "2024-08-25T12:00:00.000Z"
    }
  ]
  

### 5. *Update a Task*

- *Request*:
  http
  PUT /api/tasks/1
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

  {
    "title": "Complete API documentation",
    "description": "Update the API documentation for the task management system",
    "status": "In Progress",
    "priority": "Medium",
    "dueDate": "2024-09-01"
  }
  

- *Response*:
  json
  {
    "message": "Task updated successfully",
    "task": {
      "id": 1,
      "title": "Complete API documentation",
      "description": "Update the API documentation for the task management system",
      "status": "In Progress",
      "priority": "Medium",
      "dueDate": "2024-09-01",
      "userId": 1,
      "createdAt": "2024-08-25T12:00:00.000Z",
      "updatedAt": "2024-08-25T13:00:00.000Z"
    }
  }
  

### 6. *Delete a Task*

- *Request*:
  http
  DELETE /api/tasks/1
  Authorization: Bearer <JWT_TOKEN>
  

- *Response*:
  json
  {
    "message": "Task deleted successfully"
  }
  

## Project Structure

plaintext
task-management-api/
├── config/
│   └── database.js       # Database connection configuration
├── controllers/
│   ├── authController.js # User authentication controller
│   └── taskController.js # Task management controller
├── middlewares/
│   └── auth.js           # Authentication middleware
├── models/
│   ├── Task.js           # Task model definition
│   └── User.js           # User model definition
├── routes/
│   ├── userRoutes.js     # Routes for user registration and login
│   └── taskRoutes.js     # Routes for task management
├── .env                  # Environment variables
├── app.js                # Main application entry point
├── package.json          # Node.js project dependencies
└── README.md             # Project documentation
