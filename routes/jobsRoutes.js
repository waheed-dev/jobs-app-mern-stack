import {
  createJob,
  updateJob,
  deleteJob,
  showStates,
  getAllJobs,
} from "../controllers/jobsController.js";

import express from "express";
import authenticateUser from "../middlewares/auth.js";

const router = express.Router();

router.route("/").post(authenticateUser,createJob).get(authenticateUser,getAllJobs);
router.route("/stats").get(authenticateUser,showStates);
router.route("/:id").patch(authenticateUser,updateJob).delete(authenticateUser,deleteJob);

export default router;
