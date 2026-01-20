import express from "express";
const router = express.Router();
import Advisory from "../models/Advisory.js";


// 1️⃣ ADD NEW ADVISORY (Admin)
router.post("/advisory", async (req, res) => {
    try {
        console.log("👉 [DEBUG] POST request received at /api/admin/advisory");
        console.log("👉 [DEBUG] Request Body:", JSON.stringify(req.body, null, 2));

        const advisory = new Advisory(req.body);
        const savedAdvisory = await advisory.save();

        console.log("✅ [DEBUG] Advisory saved successfully:", savedAdvisory._id);
        res.status(201).json(savedAdvisory);
    } catch (error) {
        console.error("❌ [DEBUG] Save Error:", error.message);
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// 1.5️⃣ GET SINGLE ADVISORY (Admin)
router.get("/advisory/:id", async (req, res) => {
    try {
        const advisory = await Advisory.findById(req.params.id);
        if (!advisory) {
            return res.status(404).json({ message: "Advisory not found" });
        }
        res.json(advisory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2️⃣ UPDATE ADVISORY (Admin)
router.put("/advisory/:id", async (req, res) => {
    try {
        const updatedAdvisory = await Advisory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedAdvisory) {
            return res.status(404).json({ message: "Advisory not found" });
        }

        res.json(updatedAdvisory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 3️⃣ DELETE ADVISORY (Admin)
router.delete("/advisory/:id", async (req, res) => {
    try {
        const deletedAdvisory = await Advisory.findByIdAndDelete(req.params.id);

        if (!deletedAdvisory) {
            return res.status(404).json({ message: "Advisory not found" });
        }

        res.json({ message: "Advisory deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
