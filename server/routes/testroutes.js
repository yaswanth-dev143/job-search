import express from 'express';
import {testpostcontroller} from '../controllers/testcontroller.js';
import {userAuth} from '../middlewares/authMiddleware.js';
//router object
const router=express.Router();
//routes
router.post('/test-post', userAuth , testpostcontroller);
//export
export default router