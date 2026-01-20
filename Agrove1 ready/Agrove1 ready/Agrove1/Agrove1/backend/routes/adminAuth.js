import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "agrove_secret_key";

// ADMIN LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: admin._id, role: "admin" },
        JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
});

export default router;
