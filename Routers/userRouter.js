import express from 'express';
import { forgotPassword, getUser, resetPassword, signinUser, signupUser } from '../Controllers/userControllers.js';
import authMiddlewares from '../Middlewares/authMiddleware.js';


const router =express.Router()

router.post('/signup-user',signupUser)//signup
router.post('/signin-user',signinUser)//signin
router.get('/get-user',authMiddlewares,getUser)// getting authorized user
router.post('/forgot-password',forgotPassword)//forgot password
router.post('/reset-password/:id/:token',resetPassword)//reset password

export default router;