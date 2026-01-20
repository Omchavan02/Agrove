import mongoose from "mongoose";
import Advisory from "./models/Advisory.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not set in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI);

// Path to frontend JSON files
const jsonPath = path.join(__dirname, "../frontend/my-app/src/data/advisory");

// Base Metadata from seed.js
const seedMetadata = [
    { title: "Rice", description: "Staple food crop grown in monsoon", filename: "riceAdvisory.json", category: "Food Crops", season: "Kharif", soilTypes: ["Alluvial", "Clay", "Loamy"], regions: ["South India", "East India", "North India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767496708/Rice-Parts_gzzjjl.jpg", path: "/rice-advisory" },
    { title: "Wheat", description: "Major rabi crop grown in winter season", filename: "wheatAdvisory.json", category: "Food Crops", season: "Rabi", soilTypes: ["Alluvial", "Loamy", "Clay"], regions: ["North India", "Central India", "West India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497012/49417_Wheat_harvest_372_m6pawk.jpg", path: "/wheat-advisory" },
    { title: "Maize", description: "Used for food and fodder", filename: "maizeAdvisory.json", category: "Food Crops", season: "Kharif", soilTypes: ["Alluvial", "Red", "Loamy"], regions: ["North India", "South India", "Central India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497245/download_izigtv.jpg", path: "/maize-advisory" },
    { title: "Barley", description: "Hardy cereal crop", filename: "barleyAdvisory.json", category: "Food Crops", season: "Rabi", soilTypes: ["Sandy", "Loamy"], regions: ["North India", "West India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768413912/Barley_1_gvblgg.jpg", path: "/barley-advisory" },
    { title: "Cotton", description: "Major fiber crop of India", filename: "cottonAdvisory.json", category: "Fibre Crops", season: "Kharif", soilTypes: ["Black", "Alluvial"], regions: ["West India", "Central India", "South India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497579/download_1_qmmvvb.jpg", path: "/cotton-advisory" },
    { title: "Sugarcane", description: "Cash crop used for sugar production", filename: "sugarcaneAdvisory.json", category: "Cash Crops", season: "Zaid", soilTypes: ["Alluvial", "Black", "Loamy"], regions: ["North India", "South India", "West India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_2_xsac7g.jpg", path: "/sugarcane-advisory" },
    { title: "Soybean", description: "Important oilseed crop", filename: "soybeanAdvisory.json", category: "Cash Crops", season: "Kharif", soilTypes: ["Alluvial", "Black"], regions: ["Central India", "West India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497595/images_2_yeyoa0.jpg", path: "/soybean-advisory" },
    { title: "Gram", description: "Protein-rich pulse crop", filename: "gramAdvisory.json", category: "Food Crops", season: "Rabi", soilTypes: ["Alluvial", "Loamy", "Red"], regions: ["Central India", "North India", "South India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_3_uyctz8.jpg", path: "/gram-advisory" },
    { title: "Mustard", description: "Oilseed crop grown in winter", filename: "mustardAdvisory.json", category: "Cash Crops", season: "Rabi", soilTypes: ["Alluvial", "Sandy", "Loamy"], regions: ["North India", "East India", "Central India"], image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_4_wgkb7r.jpg", path: "/mustard-advisory" },
    { title: "Bajra", description: "Drought resistant pearl millet", filename: "bajraAdvisory.json", category: "Food Crops", season: "Kharif", soilTypes: ["Sandy", "Black", "Red"], regions: ["West India", "North India", "Central India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414111/images_y1tarc.jpg", path: "/bajra-advisory" },
    { title: "Groundnut", description: "Oilseed crop, rich in protein", filename: "groundnutAdvisory.json", category: "Cash Crops", season: "Kharif", soilTypes: ["Sandy", "Red", "Black"], regions: ["West India", "South India", "Central India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418359/download_uylgz4.jpg", path: "/groundnut-advisory" },
    { title: "Coffee", description: "Important plantation crop", filename: "coffeeAdvisory.json", category: "Plantation Crops", season: "Plantation", soilTypes: ["Laterite", "Red", "Forest"], regions: ["South India", "East India"], image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200", path: "/coffee-advisory" },
    { title: "Tea", description: "Famous plantation crop", filename: "teaAdvisory.json", category: "Plantation Crops", season: "Plantation", soilTypes: ["Laterite", "Forest"], regions: ["East India", "South India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414326/images_1_j52tgz.jpg", path: "/tea-advisory" },
    { title: "Rubber", description: "Major industrial crop", filename: "rubberAdvisory.json", category: "Plantation Crops", season: "Plantation", soilTypes: ["Laterite", "Red"], regions: ["South India", "East India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414376/download_a01aeb.jpg", path: "/rubber-advisory" },
    { title: "Coconut", description: "Multi-purpose palm crop", filename: "coconutAdvisory.json", category: "Plantation Crops", season: "Plantation", soilTypes: ["Sandy", "Alluvial", "Red"], regions: ["South India", "East India", "West India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414401/download_1_j4lr1n.jpg", path: "/coconut-advisory" },
    { title: "Arecanut", description: "Commercial plantation crop", filename: "arecanutAdvisory.json", category: "Plantation Crops", season: "Plantation", soilTypes: ["Laterite", "Red", "Alluvial"], regions: ["South India", "East India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414421/download_2_cn5d6z.jpg", path: "/arecanut-advisory" },
    { title: "Potato", description: "Major horticultural tuber crop", filename: "potatoAdvisory.json", category: "Horticultural Crops", season: "Horticulture", soilTypes: ["Sandy", "Loamy"], regions: ["North India", "East India", "West India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414444/download_3_teg21d.jpg", path: "/potato-advisory" },
    { title: "Tomato", description: "Widely cultivated vegetable", filename: "tomatoAdvisory.json", category: "Horticultural Crops", season: "Horticulture", soilTypes: ["Loamy", "Red", "Black"], regions: ["North India", "South India", "Central India"], image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1200", path: "/tomato-advisory" },
    { title: "Onion", description: "Important bulb vegetable", filename: "onionAdvisory.json", category: "Horticultural Crops", season: "Horticulture", soilTypes: ["Loamy", "Alluvial", "Clay"], regions: ["West India", "South India", "Central India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414493/download_4_jttzzt.jpg", path: "/onion-advisory" },
    { title: "Banana", description: "Globally important fruit crop", filename: "bananaAdvisory.json", category: "Horticultural Crops", season: "Horticulture", soilTypes: ["Alluvial", "Clay", "Loamy"], regions: ["South India", "East India", "West India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414510/download_5_ivru3x.jpg", path: "/banana-advisory" },
    { title: "Mango", description: "The King of Fruits", filename: "mangoAdvisory.json", category: "Horticultural Crops", season: "Horticulture", soilTypes: ["Alluvial", "Laterite", "Red"], regions: ["North India", "South India", "West India", "East India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414539/download_6_xjbfob.jpg", path: "/mango-advisory" },
    { title: "Tobacco", description: "Commercial cash crop", filename: "tobaccoAdvisory.json", category: "Cash Crops", season: "Kharif", soilTypes: ["Red", "Alluvial", "Loamy"], regions: ["South India", "West India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414584/download_7_zfvuli.jpg", path: "/tobacco-advisory" },
    { title: "Sesame (Til)", description: "Oilseed crop sesame", filename: "sesameAdvisory.json", category: "Cash Crops", season: "Kharif", soilTypes: ["Sandy", "Loamy", "Red"], regions: ["West India", "South India", "Central India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414612/download_8_qaqqk5.jpg", path: "/sesame-advisory" },
    { title: "Jute", description: "Golden fibre crop", filename: "juteAdvisory.json", category: "Fibre Crops", season: "Kharif", soilTypes: ["Alluvial", "Loamy"], regions: ["East India", "North East India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414646/download_9_oamvsf.jpg", path: "/jute-advisory" },
    { title: "Mesta", description: "Fibre crop substitute for jute", filename: "mestaAdvisory.json", category: "Fibre Crops", season: "Kharif", soilTypes: ["Laterite", "Red", "Loamy"], regions: ["East India", "South India", "Central India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414691/download_10_caadnw.jpg", path: "/mesta-advisory" },
    { title: "Flax (Linseed)", description: "Fibre and oilseed crop", filename: "flaxAdvisory.json", category: "Fibre Crops", season: "Rabi", soilTypes: ["Alluvial", "Deep Black"], regions: ["Central India", "North India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414733/download_11_e3y0ws.jpg", path: "/flax-advisory" },
    { title: "Hemp (Sunn Hemp)", description: "Green manure and fibre crop", filename: "hempAdvisory.json", category: "Fibre Crops", season: "Kharif", soilTypes: ["Loamy", "Sandy"], regions: ["North India", "Central India", "South India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414765/download_12_kqqiub.jpg", path: "/hemp-advisory" },
    { title: "Ramie", description: "Perennial flowering plant", filename: "ramieAdvisory.json", category: "Fibre Crops", season: "Kharif", soilTypes: ["Sandy Loam", "Loamy"], regions: ["North East India", "West Bengal"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414871/download_15_al4vm0.jpg", path: "/ramie-advisory" },
    { title: "Cashew", description: "Tropical evergreen tree", filename: "cashewAdvisory.json", category: "Plantation Crops", season: "Plantation", soilTypes: ["Red Sandy Loam", "Laterite"], regions: ["South India", "Unknown"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414808/download_13_a6algc.jpg", path: "/cashew-advisory" },
    { title: "Pomegranate", description: "Fruit-bearing deciduous shrub", filename: "pomegranateAdvisory.json", category: "Horticultural Crops", season: "Horticulture", soilTypes: ["Sandy Loam", "Deep Loamy"], regions: ["West India", "South India"], image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414837/download_hjuel5.jpg", path: "/pomegranate-advisory" }
];

const seedDB = async () => {
    try {
        await Advisory.deleteMany({});
        console.log("Cleared existing advisories.");

        const fullAdvisoryData = seedMetadata.map(meta => {
            const filePath = path.join(jsonPath, meta.filename);
            let sectionsData = {};
            let headerData = {};

            if (fs.existsSync(filePath)) {
                const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                sectionsData = fileContent.sections || {};
                headerData = fileContent.header || {};
                console.log(`Merged data for ${meta.title}`);
            } else {
                console.warn(`Warning: JSON file not found for ${meta.title} (${meta.filename})`);
            }

            return {
                ...meta,
                header: headerData,
                sections: sectionsData
            };
        });

        await Advisory.insertMany(fullAdvisoryData);
        console.log(`Database seeded with ${fullAdvisoryData.length} full advisory records!`);

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
