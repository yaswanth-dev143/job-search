import express from 'express';
import { loginController, registercontroller } from '../controllers/authcontroller.js';
//router object
const router = express.Router();
//routes
//REGISTER || POST
router.post('/register', registercontroller);

//LOGIN || POST
router.post('/login',loginController);
//export
export default router;