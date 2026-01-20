import express from "express";
import {
  getProfile,
  updateProfile,
  updateDocuments,
} from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/update", protect, updateProfile);
router.put("/documents", protect, updateDocuments);

export default router;