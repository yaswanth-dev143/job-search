import express from 'express';
import {testpostcontroller} from '../controllers/testcontroller.js';
//router object
const router=express.Router();
//routes
router.post('/test-post',testpostcontroller);
//export
export default router