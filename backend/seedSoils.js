import mongoose from "mongoose";
import Soil from "./models/Soil.js";
import dotenv from "dotenv";
dotenv.config();

const soilsData = [
    {
        uid: "alluvial",
        name: "Alluvial Soil",
        tagline: "The Food Bowl of India",
        desc: "Alluvial soil is formed by sediment deposition carried by rivers. It is the most fertile soil in India and covers nearly 40% of the total land area, making it the backbone of Indian agriculture.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768415855/Alluvial-Soil_ito6fj.jpg",
        characteristics: [
            {
                text: "Rich in Potash and Lime",
                icon: "FlaskConical",
                description: ["Supports strong plant growth", "Enhances crop yield and grain quality"]
            },
            {
                text: "Deficient in Nitrogen and Phosphorus",
                icon: "AlertTriangle",
                description: ["Requires regular fertilizer application", "Nutrient balance is essential for high productivity"]
            },
            {
                text: "Texture Varies from Sandy Loam to Clay",
                icon: "Layers",
                description: ["Sandy loam → good drainage", "Clayey soil → high water-holding capacity"]
            },
            {
                text: "Light Grey to Ash Grey Color",
                icon: "Palette",
                description: ["Indicates fresh river deposits", "Highly suitable for intensive farming"]
            }
        ],
        regions: ["Punjab", "Haryana", "Uttar Pradesh", "Bihar", "West Bengal", "Assam"],
        crops: [
            { name: "Rice", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417922/download_p5mjza.jpg" },
            { name: "Wheat", image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200" },
            { name: "Sugarcane", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417967/download_nkhi5m.jpg" },
            { name: "Cotton", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417969/download_mc1tep.jpg" },
            { name: "Jute", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417998/download_kkyexa.jpg" },
            { name: "Oilseeds", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418001/download_rpjkj4.jpg" },
            { name: "Pulses", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418339/download_zmo59w.jpg" }
        ],
        remediation: "Regular application of Nitrogenous fertilizers and Compost is recommended.",
        healthTips: [
            { title: "Balanced Fertilizer Use", items: ["Apply Nitrogen (N) and Phosphorus (P) regularly", "Avoid overuse to maintain soil health"] },
            { title: "Organic Matter Addition", items: ["Farmyard manure (FYM)", "Compost / Vermicompost", "Improves soil structure and fertility"] },
            { title: "Proper Irrigation Management", items: ["Prevents waterlogging in clayey areas", "Enhances root development"] },
            { title: "Crop Rotation", items: ["Rice → Wheat → Pulses", "Helps maintain nutrient balance"] },
            { title: "Green Manuring", items: ["Use Dhaincha or Sunhemp", "Naturally increases nitrogen content"] }
        ],
        conclusion: "Alluvial soil is highly productive and supports intensive agriculture. With balanced fertilizers, organic inputs, and proper water management, it ensures stable and high crop yields year after year."
    },
    {
        uid: "black",
        name: "Black Soil (Regur)",
        tagline: "Ideal for Cotton Cultivation",
        desc: "Black soil, also known as Regur soil, is of volcanic origin and formed from Basalt (Deccan Trap) rocks. It is famous for its self-ploughing nature, caused by swelling when wet and cracking when dry, which naturally loosens the soil.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768416447/download_16_zlij6e.jpg",
        characteristics: [
            {
                text: "Rich in Calcium, Magnesium & Potash",
                icon: "FlaskConical",
                description: ["Promotes strong plant growth", "Especially suitable for fibre and oilseed crops"]
            },
            {
                text: "Poor in Nitrogen & Organic Matter",
                icon: "AlertTriangle",
                description: ["Needs nitrogen supplementation", "Organic inputs are essential for sustained fertility"]
            },
            {
                text: "High Water Retention Capacity",
                icon: "Droplets",
                description: ["Holds moisture for a long time", "Ideal for rainfed agriculture"]
            },
            {
                text: "Deep Black to Grey Color",
                icon: "Palette",
                description: ["Indicates presence of iron and clay minerals", "Soil depth supports deep root systems"]
            }
        ],
        regions: ["Maharashtra", "Madhya Pradesh", "Gujarat", "Karnataka", "Telangana"],
        crops: [
            { name: "Cotton", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417969/download_mc1tep.jpg" },
            { name: "Soybean", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418181/download_rj48o2.jpg" },
            { name: "Millets (Jowar, Bajra)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418199/download_p4cebn.jpg" },
            { name: "Tobacco", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418202/download_ljmo7k.jpg" },
            { name: "Groundnut", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418359/download_uylgz4.jpg" },
            { name: "Pulses", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418339/download_zmo59w.jpg" }
        ],
        remediation: "Application of Phosphorus and Nitrogen is essential for higher yields.",
        healthTips: [
            { title: "Nitrogen Management", items: ["Apply urea or ammonium-based fertilizers in split doses", "Improves crop yield significantly"] },
            { title: "Add Organic Matter", items: ["Farmyard manure (FYM)", "Compost or vermicompost", "Improves soil aeration and fertility"] },
            { title: "Proper Drainage Arrangement", items: ["Prevents waterlogging during heavy rainfall", "Raised beds recommended"] },
            { title: "Crop Rotation", items: ["Cotton → Soybean → Pulses", "Maintains nutrient balance"] },
            { title: "Timely Tillage", items: ["Avoid ploughing when soil is too wet", "Prevents soil compaction"] }
        ],
        conclusion: "Black soil is highly productive due to its moisture-holding capacity. With proper nitrogen supply, organic inputs, and drainage management, it provides excellent yields, especially for cotton and oilseed crops."
    },
    {
        uid: "red",
        name: "Red Soil",
        tagline: "The Iron-Rich Earth",
        desc: "Red soil develops on crystalline igneous rocks in low to moderate rainfall areas. Its red colour is due to the diffusion of iron oxide, indicating good aeration but low natural fertility.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768416534/download_17_ghnnyl.jpg",
        characteristics: [
            {
                text: "Rich in Iron and Potash",
                icon: "FlaskConical",
                description: ["Supports root development", "Gives good response to fertilizers"]
            },
            {
                text: "Deficient in Nitrogen, Phosphorus & Humus",
                icon: "AlertTriangle",
                description: ["Naturally low fertility", "Requires nutrient and organic matter addition"]
            },
            {
                text: "Porous and Friable Texture",
                icon: "Layers",
                description: ["Well aerated and easy to cultivate", "Supports deep root penetration"]
            },
            {
                text: "Low Moisture Retention Capacity",
                icon: "Droplets",
                description: ["Drains water quickly", "Needs frequent irrigation in dry periods"]
            }
        ],
        regions: ["Tamil Nadu", "Odisha", "Chhattisgarh", "Jharkhand", "Telangana"],
        crops: [
            { name: "Groundnut", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418359/download_uylgz4.jpg" },
            { name: "Millets (Ragi, Jowar, Bajra)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418362/download_ybvgny.jpg" },
            { name: "Pulses", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418339/download_zmo59w.jpg" },
            { name: "Cotton", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417969/download_mc1tep.jpg" },
            { name: "Oilseeds", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418001/download_rpjkj4.jpg" }
        ],
        remediation: "Requires irrigation and organic manure/compost to improve moisture retention.",
        healthTips: [
            { title: "Add Organic Matter", items: ["Farmyard manure (FYM)", "Compost / Vermicompost", "Improves moisture retention"] },
            { title: "Balanced Fertilizer Application", items: ["Nitrogen and Phosphorus are essential", "Use soil testing for accurate dosage"] },
            { title: "Mulching", items: ["Reduces evaporation losses", "Maintains soil moisture"] },
            { title: "Green Manuring", items: ["Sunhemp or Dhaincha", "Improves nitrogen content naturally"] },
            { title: "Contour Farming / Bunding", items: ["Prevents soil erosion in sloping areas"] }
        ],
        conclusion: "Red soil is easy to cultivate but low in fertility. With organic matter addition, balanced fertilizers, and moisture conservation practices, it can give stable and profitable crop yields."
    },
    {
        uid: "laterite",
        name: "Laterite Soil",
        tagline: "Brick Soil of the Tropics",
        desc: "Laterite soil is formed under high temperature and heavy rainfall conditions through an intense leaching process. The word 'Laterite' comes from the Latin word Later, meaning brick, as this soil hardens on exposure to air.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768416584/download_18_nd4xlj.jpg",
        characteristics: [
            {
                text: "Rich in Iron Oxide and Aluminium",
                icon: "FlaskConical",
                description: ["Gives reddish-brown colour", "Poor natural fertility"]
            },
            {
                text: "Poor in Nitrogen, Potash & Lime",
                icon: "AlertTriangle",
                description: ["Needs regular nutrient supplementation", "Not suitable for intensive food grain farming without treatment"]
            },
            {
                text: "Acidic in Nature",
                icon: "TestTube",
                description: ["Low pH restricts nutrient availability", "Requires soil correction"]
            },
            {
                text: "Hardens on Drying",
                icon: "Sun",
                description: ["Difficult to plough when dry", "Needs moisture management"]
            }
        ],
        regions: ["Karnataka", "Kerala", "Odisha", "Meghalaya"],
        crops: [
            { name: "Cashew", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418589/download_acub3i.jpg" },
            { name: "Tea", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418622/download_oonbrg.jpg" },
            { name: "Coffee", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418628/download_dw325p.jpg" },
            { name: "Rubber", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418626/download_cakaqb.jpg" },
            { name: "Coconut", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418996/download_yyypov.jpg" },
            { name: "Arecanut", image: "https://images.unsplash.com/photo-1620668987178-01150g.jpg?w=200" } // Placeholder
        ],
        remediation: "Liming is required to correct acidity. Heavy manuring is needed.",
        healthTips: [
            { title: "Liming (Apply Lime / Dolomite)", items: ["Reduces soil acidity", "Improves nutrient availability"] },
            { title: "Add Organic Matter", items: ["Farmyard manure (FYM)", "Compost / Vermicompost", "Improves soil structure and fertility"] },
            { title: "Mulching", items: ["Prevents soil hardening", "Conserves moisture"] },
            { title: "Contour Farming & Terracing", items: ["Reduces soil erosion in hilly areas"] },
            { title: "Proper Drainage Management", items: ["Prevents nutrient loss due to heavy rainfall"] }
        ],
        conclusion: "Laterite soil is naturally low in fertility, but with liming, organic matter addition, and moisture conservation, it becomes suitable for profitable plantation crops."
    },
    {
        uid: "arid",
        name: "Arid (Desert) Soil",
        tagline: "Soil of the Dry Lands",
        desc: "Arid (desert) soil is mainly found in arid and semi-arid regions. It is formed due to wind deposition and low rainfall, making it light, sandy, and dry in nature.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768416644/download_19_lmj4ok.jpg",
        characteristics: [
            {
                text: "Sandy Structure & Saline Nature",
                icon: "Layers",
                description: ["Soil particles are loose and coarse", "Low water-holding capacity", "Salinity affects crop growth"]
            },
            {
                text: "Rich in Soluble Salts & Phosphates",
                icon: "FlaskConical",
                description: ["Contains useful minerals", "Excess salts reduce nutrient absorption"]
            },
            {
                text: "Deficient in Nitrogen & Organic Matter",
                icon: "AlertTriangle",
                description: ["Poor natural fertility", "Needs external nutrient support"]
            },
            {
                text: "High pH Value (Alkaline Soil)",
                icon: "TestTube",
                description: ["Restricts availability of micronutrients", "Requires soil correction for better yield"]
            }
        ],
        regions: ["Rajasthan", "Northern Gujarat", "Southern Punjab", "Western Haryana"],
        crops: [
            { name: "Bajra (Pearl Millet)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418764/download_jubo3n.jpg" },
            { name: "Guar (Cluster Bean)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418766/download_oq7dzb.jpg" },
            { name: "Dates (Date Palm)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418777/download_cxty3r.jpg" },
            { name: "Moong", image: "https://images.unsplash.com/photo-1627464077636-i09h3d.jpg?w=200" }, // Placeholder for Moong
            { name: "Sesame", image: "https://images.unsplash.com/photo-1620668987178-01150g.jpg?w=200" } // Placeholder for Sesame
        ],
        remediation: "Drip irrigation and Gypsum application can make it cultivable.",
        healthTips: [
            { title: "Drip Irrigation", items: ["Saves water", "Delivers moisture directly to roots"] },
            { title: "Gypsum Application", items: ["Reduces soil salinity and alkalinity", "Improves soil structure"] },
            { title: "Add Organic Matter", items: ["Farmyard manure (FYM)", "Compost", "Vermicompost"] },
            { title: "Nitrogen Management", items: ["Use urea in controlled quantity", "Practice green manuring (Guar, Dhaincha)"] },
            { title: "Mulching", items: ["Reduces evaporation", "Maintains soil moisture"] },
            { title: "Crop Rotation", items: ["Bajra → Guar → Fallow", "Improves soil fertility naturally"] }
        ],
        conclusion: "Although arid soil is naturally low in fertility, proper irrigation, organic inputs, and crop selection can convert it into productive agricultural land."
    },
    {
        uid: "forest",
        name: "Forest / Mountain Soil",
        tagline: "Rich Organic Mountain Soil",
        desc: "Forest or Mountain soil is found on hill slopes and mountainous regions covered with natural vegetation. Its character varies with altitude, slope, rainfall, and forest cover, making it highly diverse in nature.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768416714/download_20_wjgqqb.jpg",
        characteristics: [
            {
                text: "Rich in Humus and Organic Matter",
                icon: "Leaf",
                description: ["Formed from decomposed forest litter", "Enhances soil fertility and structure"]
            },
            {
                text: "Deficient in Potash, Phosphorus & Lime",
                icon: "AlertTriangle",
                description: ["Needs balanced fertilizer application", "Nutrient deficiency limits food grain cultivation"]
            },
            {
                text: "Acidic in Nature (Low pH)",
                icon: "TestTube",
                description: ["Common in high-rainfall hill regions", "Restricts availability of some nutrients"]
            },
            {
                text: "Loamy and Silty in Valleys",
                icon: "Layers",
                description: ["Fertile and moisture-retentive", "Best suited for horticulture and plantations"]
            }
        ],
        regions: ["Jammu & Kashmir", "Himachal Pradesh", "Uttarakhand", "Sikkim"],
        crops: [
            { name: "Apples", image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=200" },
            { name: "Tea", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418622/download_oonbrg.jpg" },
            { name: "Spices (Cardamom, Pepper)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418910/spices_1100x_zjngf9.webp" },
            { name: "Citrus fruits", image: "https://images.unsplash.com/photo-1582281298055-e25b84a30b15?w=200" }, // Placeholder
            { name: "Temperate vegetables", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=200" } // Placeholder
        ],
        remediation: "Terrace farming and organic fertilizers are suitable.",
        healthTips: [
            { title: "Terrace Farming", items: ["Prevents soil erosion on slopes", "Improves water retention"] },
            { title: "Liming", items: ["Reduces soil acidity", "Improves nutrient availability"] },
            { title: "Organic Matter Addition", items: ["Compost, leaf litter, FYM", "Maintains humus content"] },
            { title: "Contour Ploughing", items: ["Reduces runoff and nutrient loss"] },
            { title: "Controlled Grazing & Deforestation Prevention", items: ["Maintains soil stability", "Prevents land degradation"] }
        ],
        conclusion: "Forest and mountain soil is naturally rich in organic matter but acidic in nature. With terrace farming, liming, and organic inputs, it supports high-value horticulture and plantation crops."
    },
    {
        uid: "saline",
        name: "Saline / Alkaline Soil",
        tagline: "Usara / Reh Soil",
        desc: "Saline/Alkaline soil contains excess soluble salts, mainly Sodium, Potassium, and Magnesium. It commonly develops in dry and semi-dry regions due to over-irrigation, poor drainage, and high evaporation, which causes salts to accumulate on the surface.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768416759/saline-soil-cattail-plant-grows-242348632_nmhwc2.jpg",
        characteristics: [
            {
                text: "White Salt Crust on Surface",
                icon: "Layers",
                description: ["Visible salt layer after water evaporation", "Reduces seed germination"]
            },
            {
                text: "Infertile in Natural Condition",
                icon: "AlertTriangle",
                description: ["Poor plant growth without treatment", "Requires soil reclamation"]
            },
            {
                text: "Poor Drainage & Hard Soil Structure",
                icon: "Droplets",
                description: ["Waterlogging after irrigation", "Roots fail to penetrate properly"]
            },
            {
                text: "Deficient in Nitrogen & Calcium",
                icon: "FlaskConical",
                description: ["Nutrient imbalance", "Needs chemical and organic correction"]
            }
        ],
        regions: ["Punjab", "Haryana", "Sundarbans (West Bengal)", "Rann of Kutch (Gujarat)"],
        crops: [
            { name: "Coconut (tolerant)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768418996/download_yyypov.jpg" },
            { name: "Barley", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768419019/download_sxrog6.jpg" },
            { name: "Sugar beet", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768419052/download_loec37.jpg" },
            { name: "Rice (in controlled conditions)", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417922/download_p5mjza.jpg" },
            { name: "Salt-tolerant grasses", image: "https://images.unsplash.com/photo-1543781534-7d52f9473b64?w=200" } // Placeholder
        ],
        remediation: "Application of Gypsum and crop rotation with Dhaincha (Green Manure).",
        healthTips: [
            { title: "Gypsum Application", items: ["Replaces sodium with calcium", "Improves soil structure and fertility"] },
            { title: "Proper Drainage System", items: ["Removes excess salts", "Prevents water stagnation"] },
            { title: "Leaching with Good Quality Water", items: ["Washes salts below root zone", "Best done after gypsum application"] },
            { title: "Add Organic Matter", items: ["Farmyard manure (FYM)", "Compost / Green manure", "Improves soil aggregation"] },
            { title: "Adopt Salt-Tolerant Crops Usually", items: ["Gradual soil improvement", "Reduces economic loss"] }
        ],
        conclusion: "Saline and alkaline soils are unproductive in natural condition, but with gypsum application, drainage improvement, and organic matter addition, they can be reclaimed and brought under cultivation."
    },
    {
        uid: "peaty",
        name: "Peaty / Marshy Soil",
        tagline: "The Organic Swamps",
        desc: "Peaty or marshy soil is found in regions of heavy rainfall and high humidity. It is formed due to the accumulation of partially decomposed organic matter in waterlogged conditions, resulting in very high humus content.",
        image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768416802/download_21_scynuo.jpg",
        characteristics: [
            {
                text: "Very High Organic Matter (40–50%)",
                icon: "Leaf",
                description: ["Improves water-holding capacity", "But slows decomposition due to waterlogging"]
            },
            {
                text: "Heavy Texture & Black Color",
                icon: "Palette",
                description: ["Difficult to cultivate when wet", "Dark colour due to organic content"]
            },
            {
                text: "Highly Acidic in Nature",
                icon: "TestTube",
                description: ["Low pH limits nutrient availability", "Needs soil correction"]
            },
            {
                text: "Rich in Iron but Poor in Other Nutrients",
                icon: "FlaskConical",
                description: ["Iron toxicity may affect crops", "Deficient in Potash and Phosphorus"]
            }
        ],
        regions: ["Kottayam (Kerala)", "Coastal Odisha", "Sundarbans (West Bengal)"],
        crops: [
            { name: "Rice", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417922/download_p5mjza.jpg" },
            { name: "Jute", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768417998/download_kkyexa.jpg" },
            { name: "Mangroves", image: "https://res.cloudinary.com/ddgxqjfbp/image/upload/v1768419049/download_hslwso.jpg" },
            { name: "Water chestnut", image: "https://images.unsplash.com/photo-1615485500704-8e990b72a4d7?w=200" }, // Placeholder
            { name: "Grasses (fodder)", image: "https://images.unsplash.com/photo-1533460004989-b6503f66e9eb?w=200" } // Placeholder
        ],
        remediation: "Drainage improvement and application of Lime.",
        healthTips: [
            { title: "Drainage Management", items: ["Controlled drainage reduces waterlogging", "Improves root respiration"] },
            { title: "Liming", items: ["Reduces soil acidity", "Improves nutrient availability"] },
            { title: "Balanced Fertilizer Application", items: ["Apply Potash and Phosphorus", "Avoid excess nitrogen"] },
            { title: "Raised Bed Cultivation", items: ["Prevents root damage", "Improves crop establishment"] },
            { title: "Use Acid-Tolerant Crop Varieties", items: ["Reduces yield loss", "Ensures stable production"] }
        ],
        conclusion: "Peaty and marshy soils are rich in organic matter but highly acidic and waterlogged. With proper drainage, liming, and crop selection, they can be effectively used for rice, jute, and wetland farming."
    }
];

const seedDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

        if (!MONGO_URI) {
            console.error("❌ MONGO_URI is not set in .env file");
            process.exit(1);
        }
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for Seeding...");

        await Soil.deleteMany({});
        console.log("Cleared existing Soil data.");

        await Soil.insertMany(soilsData);
        console.log("Seeded Soil data successfully!");

        mongoose.connection.close();
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
