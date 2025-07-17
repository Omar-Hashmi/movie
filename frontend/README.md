🎬 Movie App – Full Stack Project Overview
Project Description
This project is a full-stack Movie Application developed using React, TypeScript, and Vite on the frontend, and Express.js with MongoDB on the backend. It includes user authentication, movie management, and integration with external movie APIs like TMDB and OMDB.
Frontend
- Built with React, TypeScript, and Vite
- Uses Axios for API calls
- JWT-based login/signup
- Proxy setup for API calls during development
- Environment variables configured with Vite (`VITE_` prefix)
Backend
- Built with Express.js and TypeScript
- MongoDB and Mongoose for database operations
- Uses bcrypt for password hashing
- JWT tokens for secure authentication
- Centralized environment variables using dotenv
- Logging with Winston
- Organized routes, controllers, middleware, and utilities
Environment Setup
All environment variables (e.g., Mongo URI, JWT secret, TMDB/OMDB API keys) are managed through a single `.env` file placed at the project root.
