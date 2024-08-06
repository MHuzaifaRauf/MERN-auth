import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

// Connect to MongoDB
connectDB();

const app = express();

// Adding middleware to parse JSON request bodies, form data, and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// User routes
app.use('/api/users', userRoutes);

// Error handling middleware, for unknown routes and any other errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});