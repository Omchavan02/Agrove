import mongoose from "mongoose";

const AdvisorySchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    season: String,
    soilTypes: [String],
    regions: [String],
    image: String,
    path: String,
    // Expanded Fields for Full Advisory
    header: {
        title: String,
        image: String,
        imageAlt: String,
        tags: [{ text: String, bgClass: String }]
    },
    sections: {
        overview: { title: String, content: String },
        climate: {
            title: String,
            items: [{ label: String, value: String, iconKey: String, colors: { bg: String, border: String, text: String } }]
        },
        sowing: {
            title: String,
            items: [{ label: String, value: String }]
        },
        fertilizer: {
            title: String,
            columns: [String],
            rows: [{ nutrient: String, dosage: String, timing: String }]
        },
        irrigation: {
            title: String,
            items: [{ stage: String, time: String, method: String }]
        },
        pest: {
            title: String,
            items: [{ name: String, symptoms: String, control: String }]
        },
        harvesting: { title: String, content: String }
    }
});

const Advisory = mongoose.model("Advisory", AdvisorySchema);
export default Advisory;
