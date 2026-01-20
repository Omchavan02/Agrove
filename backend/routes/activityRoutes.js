import express from "express";
import {
  createActivity,
  getActivities,
  updateActivity,
  deleteActivity
} from "../controllers/activityController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createActivity);
router.get("/", getActivities);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router;
