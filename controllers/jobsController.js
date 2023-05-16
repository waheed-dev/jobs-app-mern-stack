import Job from "../models/Job.js";
import {StatusCodes} from "http-status-codes";
import mongoose from "mongoose";
import moment from 'moment'

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
    const job = await Job.findOne({_id: jobId})
    if (req.user.userId === job.createdBy.toString()) {
        await Job.findOneAndDelete({_id: jobId})
        return res.status(200).json('job removed')
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
    const job = await Job.findOne({_id: jobId})
    if (req.user.userId === job.createdBy.toString()) {
        const updatedJob = await Job.findOneAndUpdate({_id: jobId}, req.body, {
            new: true,
            runValidators: true
        })
        return res.status(StatusCodes.OK).json({updatedJob})
    }
    res.status(401).json('unauthorized')
};
const showStates = async (req, res) => {
    let stats = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id: '$status', count: {$sum: 1}}}
    ])
    stats = stats.reduce((acc, cur) => {
        const {_id: title, count} = cur
        acc[title] = count
        return acc
    }, {})
    const defaultStates = {
        pending: stats.pending || 0,
        declined: stats.declined || 0,
        interview: stats.interview || 0,

    }
    let monthlyApplications = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: {_id: {year: {$year: '$createdAt'}, month: {$month: '$createdAt'}},count: {$sum : 1}}
        },{$sort :{'_id.year' : -1,'_id.month' : -1}},
        {$limit : 6}
    ])
    monthlyApplications = monthlyApplications.map((item) => {
        const {_id: {year,month},count,} = item
        const date = moment().month(month - 1).year(year).format('MMM Y')
        return { date,count}
    }).reverse()
    res.status(StatusCodes.OK).json({defaultStates, monthlyApplications})
};

export {createJob, updateJob, deleteJob, showStates, getAllJobs};
