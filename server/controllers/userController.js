import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateJWT.js';
import User from '../models/userModel.js';

/**
 * @description Register a new user
 * @route POST: /api/users
 * @access Public
 */
export const registerUser = asyncHandler( async (req, res) => {
    const { email, name, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // If user does not exsist, create a new user
    const user = await User.create({ email, name, password });
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }        
});

/**
 * @description Authenticate/Login user and set token
 * @route POST: /api/users/auth
 * @access Public
 */
export const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await user.comparePassword(password)) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }   
});

/**
 * @description Get user profile
 * @route GET: /api/users/profile
 * @access Private
 */
export const getUserProfile = asyncHandler( async (req, res) => {
    res.status(200).json({msg: "Get User Profile"});
});

/**
 * @description Update user profile
 * @route PUT: /api/users/profile
 * @access Private
 */
export const updateUserProfile = asyncHandler( async (req, res) => {
    res.status(200).json({msg: "Update User Profile"});
});

/**
 * @description Logout User
 * @route POST: /api/users/logout
 * @access Public
 */
export const logoutUser = asyncHandler( async (req, res) => {
    res.status(200).json({msg: "Logout User"});
});