import mongoose from "mongoose";

const SoilSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // e.g., "alluvial" - used for URL params
    name: String,
    tagline: String,
    desc: String,
    image: String,
    characteristics: [{
        text: String,
        icon: String, // Lucide icon name stored as string
        description: [String] // Added for detailed bullet points
    }],
    regions: [String],
    crops: [{
        name: String,
        image: String
    }],
    remediation: String,
    healthTips: [{ // Added for detailed tips (Title + Points)
        title: String,
        items: [String]
    }],
    conclusion: String // Added for the farmer-friendly conclusion
});

const Soil = mongoose.model("Soil", SoilSchema);
export default Soil;
