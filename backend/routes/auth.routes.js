import express from 'express'
import { Login, Logout, Signup } from '../controllers/auth.contoller.js';

export const AuthRoute = express.Router();

AuthRoute.post('/signup',Signup);
AuthRoute.post('/login',Login);
AuthRoute.post('/logout',Logout);