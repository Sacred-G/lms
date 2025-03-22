# Learning Management System (LMS)

A full-stack Learning Management System built with React, Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Course management
- Section and content organization
- Interactive exercises and quizzes
- Progress tracking
- Admin dashboard

## Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- MongoDB Atlas account (or local MongoDB instance)

## Getting Started

### Environment Setup

1. Clone this repository
2. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```
3. Update the `.env` file with your MongoDB connection string and JWT secret:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

### Running with Docker

1. Build and start the containers:
   ```
   docker-compose up -d
   ```

2. Access the application:
   - Frontend: http://localhost
   - Backend API: http://localhost:3001

3. Stop the containers:
   ```
   docker-compose down
   ```

### Development Setup

#### Backend

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

#### Frontend

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Project Structure

- `/client` - React frontend
- `/src` - Node.js/Express backend
  - `/controllers` - Request handlers
  - `/middleware` - Express middleware
  - `/models` - Mongoose models
  - `/routes` - API routes
  - `/utils` - Utility functions
- `/quizzes` - Quiz content and configuration

## Deployment

The application can be deployed using Docker to any cloud provider that supports Docker containers, such as:

- AWS ECS
- Google Cloud Run
- Azure Container Instances
- DigitalOcean App Platform
- Heroku

## License

This project is licensed under the MIT License.
