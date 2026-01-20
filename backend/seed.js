import mongoose from "mongoose";
import Advisory from "./models/Advisory.js";
import User from "./models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Use env var or fallback (though env is better)
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not set in .env file");
    process.exit(1);
}

mongoose.connect(MONGO_URI);

const seedData = [
    {
        title: "Rice",
        description: "Staple food crop grown in monsoon",
        category: "Food Crops",
        season: "Kharif",
        soilTypes: ["Alluvial", "Clay", "Loamy"],
        regions: ["South India", "East India", "North India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767496708/Rice-Parts_gzzjjl.jpg",
        path: "/rice-advisory"
    },
    {
        title: "Wheat",
        description: "Major rabi crop grown in winter season",
        category: "Food Crops",
        season: "Rabi",
        soilTypes: ["Alluvial", "Loamy", "Clay"],
        regions: ["North India", "Central India", "West India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497012/49417_Wheat_harvest_372_m6pawk.jpg",
        path: "/wheat-advisory"
    },
    {
        title: "Maize",
        description: "Used for food and fodder",
        category: "Food Crops",
        season: "Kharif",
        soilTypes: ["Alluvial", "Red", "Loamy"],
        regions: ["North India", "South India", "Central India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497245/download_izigtv.jpg",
        path: "/maize-advisory"
    },
    {
        title: "Barley",
        description: "Hardy cereal crop",
        category: "Food Crops",
        season: "Rabi",
        soilTypes: ["Sandy", "Loamy"],
        regions: ["North India", "West India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768413912/Barley_1_gvblgg.jpg",
        path: "/barley-advisory"
    },
    {
        title: "Cotton",
        description: "Major fiber crop of India",
        category: "Fibre Crops",
        season: "Kharif",
        soilTypes: ["Black", "Alluvial"],
        regions: ["West India", "Central India", "South India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497579/download_1_qmmvvb.jpg",
        path: "/cotton-advisory"
    },
    {
        title: "Sugarcane",
        description: "Cash crop used for sugar production",
        category: "Cash Crops",
        season: "Zaid",
        soilTypes: ["Alluvial", "Black", "Loamy"],
        regions: ["North India", "South India", "West India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_2_xsac7g.jpg",
        path: "/sugarcane-advisory"
    },
    {
        title: "Soybean",
        description: "Important oilseed crop",
        category: "Cash Crops",
        season: "Kharif",
        soilTypes: ["Alluvial", "Black"],
        regions: ["Central India", "West India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497595/images_2_yeyoa0.jpg",
        path: "/soybean-advisory"
    },
    {
        title: "Gram",
        description: "Protein-rich pulse crop",
        category: "Food Crops",
        season: "Rabi",
        soilTypes: ["Alluvial", "Loamy", "Red"],
        regions: ["Central India", "North India", "South India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_3_uyctz8.jpg",
        path: "/gram-advisory"
    },
    {
        title: "Mustard",
        description: "Oilseed crop grown in winter",
        category: "Cash Crops",
        season: "Rabi",
        soilTypes: ["Alluvial", "Sandy", "Loamy"],
        regions: ["North India", "East India", "Central India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497580/download_4_wgkb7r.jpg",
        path: "/mustard-advisory"
    },
    {
        title: "Bajra",
        description: "Drought resistant pearl millet",
        category: "Food Crops",
        season: "Kharif",
        soilTypes: ["Sandy", "Black", "Red"],
        regions: ["West India", "North India", "Central India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414111/images_y1tarc.jpg",
        path: "/bajra-advisory"
    },
    {
        title: "Groundnut",
        description: "Oilseed crop, rich in protein",
        category: "Cash Crops",
        season: "Kharif",
        soilTypes: ["Sandy", "Red", "Black"],
        regions: ["West India", "South India", "Central India"],
        image: "https://res.cloudinary.com/dkdmefrit/image/upload/v1767497245/download_izigtv.jpg",
        path: "/groundnut-advisory"
    },
    {
        title: "Coffee",
        description: "Important plantation crop",
        category: "Plantation Crops",
        season: "Plantation",
        soilTypes: ["Laterite", "Red", "Forest"],
        regions: ["South India", "East India"],
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200",
        path: "/coffee-advisory"
    },
    {
        title: "Tea",
        description: "Famous plantation crop",
        category: "Plantation Crops",
        season: "Plantation",
        soilTypes: ["Laterite", "Forest"],
        regions: ["East India", "South India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414326/images_1_j52tgz.jpg",
        path: "/tea-advisory"
    },
    {
        title: "Rubber",
        description: "Major industrial crop",
        category: "Plantation Crops",
        season: "Plantation",
        soilTypes: ["Laterite", "Red"],
        regions: ["South India", "East India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414376/download_a01aeb.jpg",
        path: "/rubber-advisory"
    },
    {
        title: "Coconut",
        description: "Multi-purpose palm crop",
        category: "Plantation Crops",
        season: "Plantation",
        soilTypes: ["Sandy", "Alluvial", "Red"],
        regions: ["South India", "East India", "West India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414401/download_1_j4lr1n.jpg",
        path: "/coconut-advisory"
    },
    {
        title: "Arecanut",
        description: "Commercial plantation crop",
        category: "Plantation Crops",
        season: "Plantation",
        soilTypes: ["Laterite", "Red", "Alluvial"],
        regions: ["South India", "East India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414421/download_2_cn5d6z.jpg",
        path: "/arecanut-advisory"
    },
    {
        title: "Potato",
        description: "Major horticultural tuber crop",
        category: "Horticultural Crops",
        season: "Horticulture",
        soilTypes: ["Sandy", "Loamy"],
        regions: ["North India", "East India", "West India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414444/download_3_teg21d.jpg",
        path: "/potato-advisory"
    },
    {
        title: "Tomato",
        description: "Widely cultivated vegetable",
        category: "Horticultural Crops",
        season: "Horticulture",
        soilTypes: ["Loamy", "Red", "Black"],
        regions: ["North India", "South India", "Central India"],
        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1200",
        path: "/tomato-advisory"
    },
    {
        title: "Onion",
        description: "Important bulb vegetable",
        category: "Horticultural Crops",
        season: "Horticulture",
        soilTypes: ["Loamy", "Alluvial", "Clay"],
        regions: ["West India", "South India", "Central India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414493/download_4_jttzzt.jpg",
        path: "/onion-advisory"
    },
    {
        title: "Banana",
        description: "Globally important fruit crop",
        category: "Horticultural Crops",
        season: "Horticulture",
        soilTypes: ["Alluvial", "Clay", "Loamy"],
        regions: ["South India", "East India", "West India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414510/download_5_ivru3x.jpg",
        path: "/banana-advisory"
    },
    {
        title: "Mango",
        description: "The King of Fruits",
        category: "Horticultural Crops",
        season: "Horticulture",
        soilTypes: ["Alluvial", "Laterite", "Red"],
        regions: ["North India", "South India", "West India", "East India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414539/download_6_xjbfob.jpg",
        path: "/mango-advisory"
    },
    {
        title: "Tobacco",
        description: "Important commercial cash crop",
        category: "Cash Crops",
        season: "Kharif",
        soilTypes: ["Red", "Alluvial", "Loamy"],
        regions: ["South India", "West India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414584/download_7_zfvuli.jpg",
        path: "/tobacco-advisory"
    },
    {
        title: "Sesame (Til)",
        description: "Oldest oilseed crop known to humanity",
        category: "Cash Crops",
        season: "Kharif",
        soilTypes: ["Sandy", "Loamy", "Red"],
        regions: ["West India", "South India", "Central India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414612/download_8_qaqqk5.jpg",
        path: "/sesame-advisory"
    },
    {
        title: "Jute",
        description: "Golden Fibre of India",
        category: "Fibre Crops",
        season: "Kharif",
        soilTypes: ["Alluvial", "Loamy"],
        regions: ["East India", "North East India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414646/download_9_oamvsf.jpg", // Placeholder or close match
        path: "/jute-advisory"
    },
    {
        title: "Mesta",
        description: "Substitute for Jute",
        category: "Fibre Crops",
        season: "Kharif",
        soilTypes: ["Laterite", "Red", "Loamy"],
        regions: ["East India", "South India", "Central India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414691/download_10_caadnw.jpg",
        path: "/mesta-advisory"
    },
    {
        title: "Flax (Linseed)",
        description: "Dual purpose crop for fibre and oil",
        category: "Fibre Crops",
        season: "Rabi",
        soilTypes: ["Alluvial", "Deep Black"],
        regions: ["Central India", "North India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414733/download_11_e3y0ws.jpg",
        path: "/flax-advisory"
    },
    {
        title: "Hemp (Sunn Hemp)",
        description: "Eco-friendly natural fibre",
        category: "Fibre Crops",
        season: "Kharif",
        soilTypes: ["Loamy", "Sandy"],
        regions: ["North India", "Central India", "South India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414765/download_12_kqqiub.jpg",
        path: "/hemp-advisory"
    },
    {
        title: "Ramie",
        description: "Strongest natural vegetable fibre",
        category: "Fibre Crops",
        season: "Kharif",
        soilTypes: ["Sandy Loam", "Loamy"],
        regions: ["North East India", "West Bengal"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414871/download_15_al4vm0.jpg",
        path: "/ramie-advisory"
    },
    {
        title: "Cashew",
        description: "High-value plantation crop",
        category: "Plantation Crops",
        season: "Plantation",
        soilTypes: ["Red Sandy Loam", "Laterite"],
        regions: ["South India", "Unknown"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414808/download_13_a6algc.jpg",
        path: "/cashew-advisory"
    },
    {
        title: "Pomegranate",
        description: "Drought-tolerant fruit crop",
        category: "Horticultural Crops",
        season: "Horticulture",
        soilTypes: ["Sandy Loam", "Deep Loamy"],
        regions: ["West India", "South India"],
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768414837/download_hjuel5.jpg",
        path: "/pomegranate-advisory"
    }
];

const seedDB = async () => {
    try {
        await Advisory.deleteMany({});
        await Advisory.insertMany(seedData);

        // Seed Admin User
        await User.deleteMany({});
        const adminUser = new User({
            name: "Admin User",
            email: "admin@agrove.com",
            password: "admin123", // Will be hashed by pre-save hook
            role: "admin"
        });
        await adminUser.save();

        console.log("Database seeded with 21 crops and 1 Admin User!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
