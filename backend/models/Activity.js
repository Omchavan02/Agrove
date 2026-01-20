import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    // 🔐 Ownership (Multi-farmer support)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔹 Core Activity Info
    activityType: {
      type: String,
      required: true,
      enum: [
        "Sowing",
        "Irrigation",
        "Pesticide Application",
        "Fertilizer Application",
        "Harvest"
      ]
    },

    field: {
      type: String,
      required: true
    },

    crop: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium"
    },

    completed: {
      type: Boolean,
      default: false
    },

    // 🌦️ Environmental Data
    location: String,
    weather: String,
    temperature: String,
    humidity: String,

    // 🌱 Sowing
    seedType: String,
    seedQuantity: String,
    sowingMethod: String,
    area: Number, // acres (Sowing & Harvest only)

    // 💧 Irrigation
    waterAmount: String,
    irrigationMethod: String,

    // 🧪 Pesticide / Fertilizer
    productName: String,
    dosage: String,
    reason: String,

    // 🚜 Harvest
    yield: Number,          // numeric for dashboard
    yieldUnit: String,      // kg / ton
    yieldDisplay: String,   // "2000 kg"
    qualityGrade: String,
    marketPrice: String,

    // 📝 Notes
    notes: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Activity", activitySchema);
