import express from "express"
import {userAuth} from "../middlewares/authMiddleware.js"
import { createJobController, deleteJobCpontroller, getAllJobsController, updateJobController,jobsStatsController } from "../controllers/jobsController.js"

export const router = express.Router()

//routes
//Creat job || POST
router.post("/create-job", userAuth, createJobController);

//GET JOBS || GET
router.get('get-jobs', userAuth, getAllJobsController )

//UPDATE JOBS || PUT || PATCH
router.patch('/update-job/:id',userAuth,updateJobController)

//DELETE JOBS || DELETE
router.delete('/delete-job/:id',userAuth, deleteJobCpontroller)

//JOBS STATS FILTER || GET
router.get('/job-stats',userAuth, jobsStatsController)

export default router