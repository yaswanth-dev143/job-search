import jobsModel from "../models/jobsModel.js"

export const createJobController = async (req,res,next) => {
    const {company,position,} = req.body
    if(!company || !position){
        next('Please Provide All Fields')
    }
    req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({job})
}
//GET JOBS
export const getAllJobsController = async (req,res,next)=>{
    const jobs = await jobsModel.find({createdBy:req.user.userId})
    res.status(201).json({
        totajobs: jobs.lenght,

    })
}

// UPDATE JOBS
export const updateJobController = async (req,res,next) =>{
    const {id} = req.params
    const {company,position} = req.body
    //validation
    if(!company || !position){
        next('Please Provide All Fields')
    }
    //FIND JOBS
    const job = await jobsModel.findOne({_id:id})
    if(!job){
        next(`no jobs with this id: ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString()){
        return
        next('Your not Authorize to update this JOb')
    }
    const updateJob = await jobsModel.findOneAndUpdate({_id:id},req.body,{
        new: true,
        runValidators: true
    })
    //res
    res.status(200).json({updateJob})
}

//DELETE JOBS
export const deleteJobCpontroller = async () => {
    const {id} = req.params
    //find job
    const job = await jobsModel.findOne({_id:id})
    //Validation
    if(!job){
        next(`no jobs with this id: ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString()){
        next('Your Not Authorized to delete this JOb')
        return
    }
    await job.deleteOne()
    res.status(200).json({message:'success, job deleted'})
}