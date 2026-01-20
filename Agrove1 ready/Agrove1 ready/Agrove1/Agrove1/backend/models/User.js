import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // 🔐 AUTH DATA
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    mobile: String,
    location: String,
    googleId: String,
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    // 👤 PROFILE DATA
    profile: {
      age: String,
      gender: String,
      phone: String,
      village: String,
      taluka: String,
      district: String,
      state: String,
      pincode: String,

      cropName: String,
      soilType: String,
      irrigationType: String,
      landArea: String,
      farmerType: String,

      bankName: String,
      accountNumber: String,
      ifsc: String,
      pmKisan: String,
    },

    // 📄 DOCUMENTS DATA
    documents: {
      aadhaarNumber: String,
      rationCard: Boolean,
      propertyCard: Boolean,
      property712No: String,
      property712File: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);