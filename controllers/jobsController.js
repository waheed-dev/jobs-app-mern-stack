import Job from "../models/Job.js";
import {StatusCodes} from "http-status-codes";

const createJob = async (req, res) => {
    const {company, position} = req.body
    req.body.createdBy = req.user.userId
    console.log(req.body)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})

};
const deleteJob = async (req, res) => {
    console.log(req.params)
    const {id: jobId} = req.params
    const job = await Job.findOne({_id : jobId})
    if (req.user.userId === job.createdBy.toString()) {
        await Job.findOneAndDelete({_id :jobId})
        return  res.status(200).json('job removed')
    }
    res.status(401).json('unauthorized')
};
const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({jobs, totalJobs: jobs.length, numOfPages: 1})
};
const updateJob = async (req, res) => {
    console.log(req.params)
    const {id: jobId} = req.params
    const job = await Job.findOne({_id : jobId})
    if (req.user.userId === job.createdBy.toString()) {
        const updatedJob = await Job.findOneAndUpdate({_id : jobId},req.body,{
            new : true,
            runValidators : true
        })
        res.status(StatusCodes.OK).json({updatedJob})
    }
    res.status(401).json('unauthorized')
};
const showStates = async (req, res) => {
    return res.send("show states");
};

export {createJob, updateJob, deleteJob, showStates, getAllJobs};
