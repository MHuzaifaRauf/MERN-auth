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
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json(user);
});

/**
 * @description Update user profile
 * @route PUT: /api/users/profile
 * @access Private
 */
export const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();
        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email
        }); 
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @description Logout User
 * @route POST: /api/users/logout
 * @access Public
 */
export const logoutUser = asyncHandler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0) // Cookie expires at the beginning of the UNIX epoch
    });
    res.status(200).json({msg: "Logged out successfully"});
});