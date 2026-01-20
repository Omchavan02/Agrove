import express from "express";
const router = express.Router();
import Soil from "../models/Soil.js";

// Create New Soil
router.post("/", async (req, res) => {
    try {
        const newSoil = new Soil(req.body);
        const savedSoil = await newSoil.save();
        res.status(201).json(savedSoil);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Soil
router.put("/:id", async (req, res) => {
    try {
        const updatedSoil = await Soil.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.json(updatedSoil);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete Soil
router.delete("/:id", async (req, res) => {
    try {
        await Soil.findByIdAndDelete(req.params.id);
        res.json({ message: "Soil deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
