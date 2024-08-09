# MERN Authentication - Server Side

This project demonstrates a robust server-side implementation for a MERN (MongoDB, Express, React, Node.js) stack authentication system. It provides a secure, scalable, and feature-rich backend for user authentication and management.

## Features

- User Registration
- User Authentication
- JSON Web Token (JWT) Generation
- Secure Password Hashing
- Protected Routes
- Error Handling Middleware
- Database Integration with MongoDB
- Cookie-based Authentication

## Project Structure

The server-side code is organized as follows:

```
server/
├── config/
│   └── db.js
├── controllers/
│   └── userController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoutes.js
├── utils/
│   └── generateToken.js
├── index.js
```

## Key Technologies

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express**: Web application framework for Node.js
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: MongoDB object modeling for Node.js
- **bcryptjs**: Library for hashing passwords
- **jsonwebtoken**: Implementation of JSON Web Tokens
- **cookie-parser**: Middleware for parsing cookies

## Setup and Installation

1. Clone the repository
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root directory and add necessary environment variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development/production
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server: `npm run server`

## Detailed Walkthrough

### Database Connection

The `connectDB` function in `config/db.js` establishes a connection to MongoDB using Mongoose:

```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

This function is called at the start of the server in `index.js`:

```javascript
import connectDB from './config/db.js';
connectDB();
```

### Express Server Setup

The main server file `index.js` sets up the Express application:

```javascript
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
```

This configuration allows the server to parse JSON request bodies, URL-encoded data, and cookies.

### Routes

User-related routes are defined in `routes/userRoutes.js` and mounted in `index.js`:

```javascript
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);
```

The `userRoutes.js` file defines endpoints for user registration, authentication, profile management, and logout.

### Controllers

The `userController.js` file contains the logic for handling user-related operations. It includes functions for:

- User registration
- User authentication
- Getting user profile
- Updating user profile
- User logout

These functions interact with the MongoDB database using Mongoose models and implement the business logic for each operation.

### Middleware

Two important middleware functions are implemented:

1. **Authentication Middleware** (`authMiddleware.js`):
   - Verifies the JWT token in the request cookies
   - If valid, attaches the user information to the request object
   - If invalid, sends an unauthorized response

2. **Error Handling Middleware** (`errorMiddleware.js`):
   - `notFound`: Handles 404 errors for unknown routes
   - `errorHandler`: Provides a consistent error response format

These middleware functions are used in `index.js`:

```javascript
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// ... (after routes)
app.use(notFound);
app.use(errorHandler);
```

### Models

The `userModel.js` file defines the Mongoose schema for user data:

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
```

This schema includes methods for password hashing and verification.

### JWT Token Generation

The `generateToken.js` utility function creates a JWT token for authenticated users:

```javascript
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
};

export default generateToken;
```

This function is used in the authentication process to provide secure, HTTP-only cookies for maintaining user sessions.

## Security Considerations

- Passwords are hashed using bcrypt before storage
- JWTs are stored in HTTP-only cookies to prevent XSS attacks
- Protected routes ensure that only authenticated users can access sensitive information
- Error messages are generalized to avoid leaking sensitive information