import {
  createJob,
  updateJob,
  deleteJob,
  showStates,
  getAllJobs,
} from "../controllers/jobsController.js";

import express from "express";
import authenticateUser from "../middlewares/auth.js";
import testUserMiddleware from "../middlewares/testUser.js";

const router = express.Router();

router.route("/").post(authenticateUser,testUserMiddleware,createJob).get(authenticateUser,getAllJobs);
router.route("/stats").get(authenticateUser,showStates);
router.route("/:id").patch(authenticateUser,testUserMiddleware,updateJob).delete(authenticateUser,testUserMiddleware,deleteJob);

export default router;
