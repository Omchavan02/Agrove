import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        // Check if exists
        const exists = await Admin.findOne({ email: "admin@agrove.com" });
        if (exists) {
            console.log("Admin already exists");
            return;
        }

        await Admin.create({
            email: "admin@agrove.com",
            password: hashedPassword
        });

        console.log("Admin created");
    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        mongoose.connection.close();
    }
};

createAdmin();
