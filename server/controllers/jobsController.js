import mongoose from "mongoose"
import jobsModel from "../models/jobsModel.js"
import moment from "moment"

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
    const {status,workType, search, sort} = req.query
    //conditions for searching filter
    const queryObject = {
        createdBy:req.user.userId
    }
    //logic filter
    if(status && status != 'all'){
        queryObject.status = status
    }
    if(workType && workType !== 'all'){
        queryObject.workType = workType
    }
    if(search && search !== 'all'){
        queryObject.position = {
            $regex:search,
            $options:'i'
        }
    }
    let queryResult = jobsModel.find(queryObject)
    //sorting
    if(sort === 'latest'){
        queryResult = queryResult.sort('-createdAt')
    }
    if(sort === 'oldest'){
        queryResult = queryResult.sort('createdAt')
    }
    if(sort === 'a-z'){
        queryResult = queryResult.sort('position')
    }
    if(sort === 'A-Z'){
        queryResult = queryResult.sort('-position')
    }

    //pAGINATION
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1)*limit

    queryResult = queryResult.skip(skip).limit(limit)
    //jobs count
    const totalJobs = await jobsModel.countDocuments(queryResult)
    const numOfPage = Math.ceil(totalJobs/limit)

    const jobs = await queryResult

    // const jobs = await jobsModel.find({createdBy:req.user.userId})
    res.status(201).json({
        totalJobs,
        jobs,
        numOfPage,
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
export const deleteJobCpontroller = async (req,res,next) => {
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

// JOBS STATS AND FILTER

 export const jobsStatsController = async (req,res) => {
    const stats = await jobsModel.aggregate([
        // search by user
        {
            $match: {
                // createdBy: req.user.userId
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
            },
        },
        {
            $group: {
                _id: '$status', 
                count: {$sum: 1}
            },
        }
    ])
    //default stats
    const defaultStats = {
        pending: stats.pending || 0,
        pending: stats.reject || 0,
        interview: stats.interview || 0
    }

    //monthly, yearly stats
    let monthlyApplication = await jobsModel.aggregate([
        {
            $match: {
                // createdBy: req.user.userId
                createdBy: new mongoose.ObjectId(req.user.userId)
            }
        },
        {
            $group: {
                _id:{
                    year: {$year: "$createdAt"},
                    month: {$month: '$createdAt'}
                },
                count: {
                    $sum: 1
                }
            }
        }
    ])

    monthlyApplication = monthlyApplication.map(item => {
        const {_id:{year,month},count} = item
        const date = moment().month(month-1).year(year).format('MMM Y')
        return {date, count}
    }).reverse()
    res

    .status(200)
    .json({ totalJob: stats.length , defaultStats, monthlyApplication })
 }