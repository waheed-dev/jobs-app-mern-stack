import Job from "../models/Job.js";
import {StatusCodes} from "http-status-codes";

const createJob = async (req, res) => {
  const {company,position} = req.body
  req.body.createdBy = req.user.userId
  console.log(req.body)
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({job})

};
const deleteJob = async (req, res) => {
  return res.send("delete job");
};
const getAllJobs = async (req, res) => {
  return res.send("get all jobs");
};
const updateJob = async (req, res) => {
  return res.send("update job");
};
const showState = async (req, res) => {
  return res.send("show states");
};

export { createJob, updateJob, deleteJob, showState, getAllJobs };
