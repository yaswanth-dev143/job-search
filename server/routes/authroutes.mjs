import express from 'express';
import { registercontroller } from '../controllers/authcontroller.js';
//router object
const router = express.Router();
//routes
router.post('/register', registercontroller);
//export
export default router