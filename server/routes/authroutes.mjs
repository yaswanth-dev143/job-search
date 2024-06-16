import express from 'express';
import { logiController, registercontroller } from '../controllers/authcontroller.js';
//router object
const router = express.Router();
//routes
// REGISTER || POST
router.post('/register', registercontroller);

// LOGIN || POST
router.post('/login',logiController)
//export
export default router