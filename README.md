# MERN Authentication Project

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that demonstrates a robust authentication system. It consists of a React-based frontend and an Express.js backend, both working together to provide a secure and user-friendly authentication experience.

## Overview

- **Client**: A React application using Redux for state management, React Router for navigation, and React-Bootstrap for UI components. It includes features like user registration, login, logout, and profile management.

- **Server**: An Express.js server that handles API requests, user authentication, and database operations. It uses MongoDB for data storage, JWT for token-based authentication, and includes middleware for protected routes.

For more detailed information:
- [Client README](./client/README.md)
- [Server README](./server/README.md)

## Quick Start

To run both the frontend and backend concurrently:

1. Ensure you have Node.js and npm installed.
2. Clone this repository.
3. Create a `.env` file in the root directory with necessary environment variables.
 ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret
   ```
4. Install dependencies:
   ```
   npm install
   cd client && npm install
   ```
5. From the root directory, run:
   ```
   npm run dev
   ```

This command will start both the server and client applications concurrently.

Note: The server dependencies and scripts are managed from the root `package.json` for convenience in running the full stack application.