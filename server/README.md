# Backend Server Setup

## Installation

1. Navigate to the server directory:
```cmd
cd server
```

2. Install dependencies:
```cmd
npm install
```

3. Start the server:
```cmd
npm run dev
```

The server will run on http://localhost:3001

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/syllabus` - Get syllabus data
- `PUT /api/syllabus/:id` - Update syllabus item

## Environment Variables

The `.env` file contains:
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 3001)
- `DATABASE_NAME` - Database name (default: gate_prep)
