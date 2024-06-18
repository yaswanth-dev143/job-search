import express from "express"
import {userAuth} from "../middlewares/authMiddleware.js"
import { createJobController, getAllJobs, getAllJobsController, updateJobController } from "../controllers/jobsController.js"

export const router = express.Router()

//routes
//Creat job || POST
router.post("/create-job", userAuth, createJobController);

//GET JOBS || GET
router.get('get-jobs', userAuth, getAllJobsController )

//UPDATE JOBS || PUT || PATCH
router.patch('/update-job/:id',userAuth,updateJobController)

//UPDATE JOBS || PUT || PATCH
router.delete('/delete-job/:id',userAuth,updateJobController)

export default router