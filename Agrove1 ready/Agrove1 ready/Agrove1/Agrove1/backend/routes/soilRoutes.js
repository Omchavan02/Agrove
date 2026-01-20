import express from "express";
const router = express.Router();
import Soil from "../models/Soil.js";

// Get All Soils (Basic Info for Hub)
router.get("/", async (req, res) => {
    try {
        const soils = await Soil.find({});
        res.json(soils);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

// Get Specific Soil by UID (e.g., /api/soils/alluvial)
router.get("/:uid", async (req, res) => {
    try {
        const soil = await Soil.findOne({ uid: req.params.uid });
        if (!soil) return res.status(404).json({ message: "Soil not found" });
        res.json(soil);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
