import dotenv from "dotenv";
dotenv.config(); // MUST BE FIRST

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

/* ROUTES */
import authRoutes from "./routes/authRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import adminAuthRoutes from "./routes/adminAuth.js"; // [NEW]
import adminAdvisoryRoutes from "./routes/adminAdvisory.js";
import adminSoilRoutes from "./routes/adminSoil.js";
import soilRoutes from "./routes/soilRoutes.js";

import profileRoutes1 from "./routes/profileRoutes1.js";
import connectDB from "./config/db.js";

import Advisory from "./models/Advisory.js";
import authAdmin from "./middleware/authAdmin.js"; // [NEW] Using the new admin middleware

import Admin from "./models/Admin.js";
import bcrypt from "bcryptjs";

const app = express();

/* SETUP ROUTE - DELETE AFTER USE */
app.get("/api/setup-admin", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const exists = await Admin.findOne({ email: "admin@agrove.com" });
    if (exists) {
      return res.send("Admin already exists. You can now login at the portal.");
    }
    await Admin.create({
      email: "admin@agrove.com",
      password: hashedPassword
    });
    res.send("✅ Admin created successfully! PLEASE LOG IN AND THEN ASK ME TO REMOVE THIS ROUTE FOR SECURITY.");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});


/* MIDDLEWARE */
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());

// connectDB(); // Optional if manual connect is used below, but keeping it if it does something specific

/* DATABASE */
mongoose.connect(process.env.MONGO_URI || process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

/* AUTH & CORE ROUTES */
app.use("/api/auth", authRoutes); // User Auth
app.use("/api/admin", adminAuthRoutes); // Admin Auth [NEW]

app.use("/api/activities", activityRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/profile", profileRoutes1);

/* ADMIN ROUTES (PROTECTED) */
// Switched to authAdmin to match new project logic
app.use("/api/admin", authAdmin, adminAdvisoryRoutes);
app.use("/api/admin/soils", authAdmin, adminSoilRoutes);

/* PUBLIC ROUTES */
app.use("/api/soils", soilRoutes);

/* PUBLIC ADVISORY SEARCH */
app.get("/api/advisory", async (req, res) => {
  try {
    const { search, category, soil, region, path } = req.query;
    let query = {};

    if (path) {
      // Clean path to be unslashed for normalization
      const cleanPath = path.startsWith('/') ? path.substring(1) : path;
      query.path = { $in: [cleanPath, `/${cleanPath}`] };
    }
    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") }
      ];
    }
    if (category && category !== "All Crops") query.category = category;
    if (soil && soil !== "All Soil Types") query.soilTypes = soil;
    if (region && region !== "All Regions") query.regions = region;

    console.log("🔍 Incoming Query:", req.query);
    const data = await Advisory.find(query);
    console.log(`✅ Mongo Query:`, JSON.stringify(query));
    console.log(`✅ Found: ${data.length} records`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* SERVER */
const PORT = process.env.PORT || 5001; // CHANGED TO 5001
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

// Remove this default export if not needed, typical for tests but router is not defined here
// export default router;