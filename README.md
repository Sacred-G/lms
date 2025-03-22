# Centered Support Service Training LMS

A Learning Management System (LMS) for a home health agency supporting people with developmental disabilities.

## Project Overview

This LMS provides training modules for support staff working with individuals with developmental disabilities. The system includes comprehensive learning materials with videos, text content, audio clips, and assessments.

### Key Learning Sections

1. Introduction to the Role
2. Understanding Client Needs and Preferences
3. Key Responsibilities of Support Staff
4. Communication and Professionalism
5. Infection Control and Hygiene Practices
6. Emergency Procedures and Crisis Management
7. 6 Rights of Medication Administration

Each section includes:

- Video content
- Text-based learning materials
- Audio clips
- Assessment quizzes

## Tech Stack

- **Backend**: Node.js with Express and TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: React with TypeScript (to be implemented)

## Project Structure

```
lms/
├── src/                      # Source code
│   ├── config/               # Configuration files
│   ├── controllers/          # API controllers
│   ├── middleware/           # Middleware functions
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   ├── public/               # Static files (videos, audio, images)
│   │   ├── videos/           # Video content
│   │   ├── audio/            # Audio content
│   │   └── images/           # Images
│   ├── views/                # View templates
│   └── index.ts              # Application entry point
├── dist/                     # Compiled JavaScript files
├── node_modules/             # Dependencies
├── .env                      # Environment variables
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd lms
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/home-health-lms
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Seed the database with initial data:

   ```
   npm run seed
   ```
5. Build the application:

   ```
   npm run build
   ```
6. Start the server:

   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Courses

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a single course
- `POST /api/courses` - Create a new course (admin/instructor only)
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Sections

- `GET /api/sections/course/:courseId` - Get all sections for a course
- `GET /api/sections/:id` - Get a single section
- `POST /api/sections` - Create a new section (admin/instructor only)
- `PUT /api/sections/:id` - Update a section
- `DELETE /api/sections/:id` - Delete a section

### Quizzes

- `GET /api/quizzes/:id` - Get a quiz
- `POST /api/quizzes` - Create a new quiz (admin/instructor only)
- `PUT /api/quizzes/:id` - Update a quiz
- `DELETE /api/quizzes/:id` - Delete a quiz
- `POST /api/quizzes/:quizId/submit` - Submit a quiz attempt

### Progress

- `GET /api/progress` - Get user progress for all courses
- `GET /api/progress/course/:courseId` - Get user progress for a specific course
- `PUT /api/progress/course/:courseId/section/:sectionId` - Update section progress

## License

[MIT License](LICENSE)
