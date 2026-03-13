import { Router } from 'express';
import {
  registerUser,
  getUsers,
  authUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateUserByAdmin
} from '../controllers/userController';

import { admin, protect } from '../middlewares/authMiddleware';
import validate from '../middlewares/validateMiddleware';
import { loginSchema, registerSchema } from '../validations/userValidation';

const router = Router();

/* ======================================================
   PUBLIC ROUTES
   ====================================================== */

// @route   POST /api/users
// @desc    Register new user
// @access  Public
router.post('/', validate(registerSchema), registerUser);

// @route   POST /api/users/login
// @desc    Login user & get token
// @access  Public
router.post('/login', validate(loginSchema), authUser);

// @route   POST /api/users/logout
// @desc    Logout user
// @access  Public
router.post('/logout', logoutUser);


/* ======================================================
   AUTHENTICATED USER ROUTES
   ====================================================== */

// @route   GET /api/users/profile
// @desc    Get logged-in user's profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/users/profile
// @desc    Update logged-in user's profile
// @access  Private
router.put('/profile', protect, updateUserProfile);


/* ======================================================
   ADMIN ROUTES
   ====================================================== */

// @route   GET /api/users
// @desc    Get all users
// @access  Admin
router.get('/', protect, admin, getUsers);

// @route   DELETE /api/users/:id
// @desc    Delete user by ID
// @access  Admin
router.delete('/:id', protect, admin, deleteUser);

// @route   PUT /api/users/:id
// @desc    Update user by ID (Admin can change isAdmin)
// @access  Admin
router.put('/:id', protect, admin, updateUserByAdmin);

export default router;