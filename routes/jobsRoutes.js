import {
  createJob,
  updateJob,
  deleteJob,
  showStates,
  getAllJobs,
} from "../controllers/jobsController.js";

import express from "express";

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStates);
router.route("/:id").patch(updateJob).delete(deleteJob);

export default router;
