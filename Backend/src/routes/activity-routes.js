import express from "express";

import {
  getAllActivities,
  registerActivity,
  getActivityById,
  deleteActivity,
  updateActivity,
} from "../controllers/activity-controller.js";

const router = express.Router();

router.get("/", getAllActivities);
router.post("/", registerActivity);
router.get("/:id", getActivityById);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
