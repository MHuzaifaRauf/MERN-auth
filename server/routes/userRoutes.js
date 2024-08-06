import express from 'express';
import { authUser, getUserProfile, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Route to register user
router.post('/', registerUser);

// Route to authenticate user
router.post('/auth', authUser);

// Route to get user profile
router.get('/profile', getUserProfile);

// Route to update user profile
router.put('/profile', updateUserProfile);

// Route to logout user
router.post('/logout', logoutUser);

/**
 * If we have 2 routes pointing to the same endpoint, then we can write them as
 * router.route('/profile').get(getUserProfile).put(updateUserProfile);
 */

export default router;