import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, HelpCircle } from "lucide-react";
import { API_BASE } from '../config';

// Lucide Icon Picker Helper (Simplified)
const availableIcons = ["FlaskConical", "AlertTriangle", "Layers", "Palette", "Droplets", "TestTube", "Sun", "Leaf"];

const EditSoil = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        uid: "",
        name: "",
        tagline: "",
        desc: "",
        image: "",
        characteristics: [],
        regions: [],
        crops: [],
        remediation: "",
        healthTips: [], // New Field
        conclusion: ""  // New Field
    });

    const isEditMode = Boolean(id);

    // Fetch Existing Data
    useEffect(() => {
        if (isEditMode) {
            const fetchSoil = async () => {
                try {
                    const allRes = await fetch(`${API_BASE}/api/soils`);
                    const allData = await allRes.json();
                    const found = allData.find(s => s._id === id);
                    if (found) {
                        // Ensure optional fields exist and format arrays for textarea editing
                        setFormData({
                            ...found,
                            characteristics: found.characteristics.map(c => ({
                                ...c,
                                description: Array.isArray(c.description) ? c.description.join('\n') : (c.description || "")
                            })),
                            healthTips: found.healthTips ? found.healthTips.map(h => ({
                                ...h,
                                items: Array.isArray(h.items) ? h.items.join('\n') : (h.items || "")
                            })) : [],
                            conclusion: found.conclusion || ""
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            };
            fetchSoil();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --- Characteristics Handlers ---
    const handleCharChange = (index, field, value) => {
        const newChars = [...formData.characteristics];
        newChars[index][field] = value;
        setFormData(prev => ({ ...prev, characteristics: newChars }));
    };
    const addChar = () => {
        setFormData(prev => ({
            ...prev,
            characteristics: [...prev.characteristics, { text: "", icon: "Layers", description: "" }]
        }));
    };
    const removeChar = (index) => {
        setFormData(prev => ({
            ...prev,
            characteristics: prev.characteristics.filter((_, i) => i !== index)
        }));
    };

    // --- Health Tips Handlers ---
    const handleHealthTipChange = (index, field, value) => {
        const newTips = [...formData.healthTips];
        newTips[index][field] = value;
        setFormData(prev => ({ ...prev, healthTips: newTips }));
    };
    const addHealthTip = () => {
        setFormData(prev => ({
            ...prev,
            healthTips: [...prev.healthTips, { title: "", items: "" }]
        }));
    };
    const removeHealthTip = (index) => {
        setFormData(prev => ({
            ...prev,
            healthTips: prev.healthTips.filter((_, i) => i !== index)
        }));
    };

    // --- Regions Handlers ---
    const handleRegionChange = (index, value) => {
        const newRegions = [...formData.regions];
        newRegions[index] = value;
        setFormData(prev => ({ ...prev, regions: newRegions }));
    };
    const addRegion = () => {
        setFormData(prev => ({ ...prev, regions: [...prev.regions, ""] }));
    };
    const removeRegion = (index) => {
        setFormData(prev => ({ ...prev, regions: prev.regions.filter((_, i) => i !== index) }));
    };

    // --- Crops Handlers ---
    const handleCropChange = (index, field, value) => {
        const newCrops = [...formData.crops];
        newCrops[index][field] = value;
        setFormData(prev => ({ ...prev, crops: newCrops }));
    };
    const addCrop = () => {
        setFormData(prev => ({
            ...prev,
            crops: [...prev.crops, { name: "", image: "" }]
        }));
    };
    const removeCrop = (index) => {
        setFormData(prev => ({
            ...prev,
            crops: prev.crops.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("adminToken");

        try {
            // Process data for submission (convert newline strings back to arrays)
            const payload = {
                ...formData,
                characteristics: formData.characteristics.map(c => ({
                    ...c,
                    description: typeof c.description === 'string' ? c.description.split('\n').filter(line => line.trim() !== '') : c.description
                })),
                healthTips: formData.healthTips.map(h => ({
                    ...h,
                    items: typeof h.items === 'string' ? h.items.split('\n').filter(line => line.trim() !== '') : h.items
                }))
            };

            const url = isEditMode
                ? `${API_BASE}/api/admin/soils/${id}`
                : `${API_BASE}/api/admin/soils`;

            const method = isEditMode ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to save");
            }

            alert("Soil Saved Successfully!");
            navigate("/admin/soils");
        } catch (err) {
            console.error(err);
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/admin/soils")}
                            className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                {isEditMode ? "Edit Soil" : "Add New Soil"}
                            </h1>
                            <p className="text-gray-500">
                                {isEditMode ? `Editing: ${formData.name}` : "Create a new soil profile"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition disabled:opacity-50"
                    >
                        <Save className="w-5 h-5 mr-2" />
                        {loading ? "Saving..." : "Save Soil"}
                    </button>
                </div>

                {/* Main Form */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Basic Info & Rich Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <div className="w-2 h-6 bg-green-500 rounded-full mr-2"></div>
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Soil Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="e.g. Alluvial Soil"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Unique ID</label>
                                    <input
                                        type="text"
                                        name="uid"
                                        value={formData.uid}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="e.g. alluvial"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Used in URL (must be unique)</p>
                                </div>
                                <div className="col-span-2 mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tagline</label>
                                    <input
                                        type="text"
                                        name="tagline"
                                        value={formData.tagline}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="e.g. The Food Bowl of India"
                                    />
                                </div>
                                <div className="col-span-2 mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                    <textarea
                                        name="desc"
                                        value={formData.desc}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="Detailed description..."
                                    />
                                </div>
                                <div className="col-span-2 mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div className="col-span-2 mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Farmer-Friendly Conclusion</label>
                                    <textarea
                                        name="conclusion"
                                        value={formData.conclusion}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                                        placeholder="Summary for farmers..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Characteristics */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                    <div className="w-2 h-6 bg-blue-500 rounded-full mr-2"></div>
                                    Characteristics
                                </h3>
                                <button
                                    onClick={addChar}
                                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg font-semibold hover:bg-blue-100"
                                >
                                    + Add Item
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.characteristics.map((char, idx) => (
                                    <div key={idx} className="border border-gray-200 p-4 rounded-xl bg-gray-50">
                                        <div className="flex gap-2 items-center mb-2">
                                            <select
                                                value={char.icon}
                                                onChange={(e) => handleCharChange(idx, "icon", e.target.value)}
                                                className="w-32 px-2 py-2 border rounded-lg bg-white text-sm"
                                            >
                                                {availableIcons.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                                            </select>
                                            <input
                                                type="text"
                                                value={char.text}
                                                onChange={(e) => handleCharChange(idx, "text", e.target.value)}
                                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                                placeholder="Characteristic Title (e.g. Rich in Potash)"
                                            />
                                            <button
                                                onClick={() => removeChar(idx)}
                                                className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <textarea
                                            value={char.description}
                                            onChange={(e) => handleCharChange(idx, "description", e.target.value)}
                                            rows="2"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                            placeholder="Description bullet points (one per line)..."
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Health Tips / Remediation */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                    <div className="w-2 h-6 bg-purple-500 rounded-full mr-2"></div>
                                    Health Tips & Remediation
                                </h3>
                                <button
                                    onClick={addHealthTip}
                                    className="px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-lg font-semibold hover:bg-purple-100"
                                >
                                    + Add Tip
                                </button>
                            </div>

                            {/* Legacy Remediation Field */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Simple Remediation (Legacy Support)</label>
                                <textarea
                                    name="remediation"
                                    value={formData.remediation}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                    placeholder="Fallback simple remediation text..."
                                />
                            </div>

                            {/* Detailed Health Tips */}
                            <div className="space-y-4">
                                {formData.healthTips.map((tip, idx) => (
                                    <div key={idx} className="border border-gray-200 p-4 rounded-xl bg-gray-50">
                                        <div className="flex justify-between items-center mb-2">
                                            <input
                                                type="text"
                                                value={tip.title}
                                                onChange={(e) => handleHealthTipChange(idx, "title", e.target.value)}
                                                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none font-semibold"
                                                placeholder="Tip Title (e.g. Gypsum Application)"
                                            />
                                            <button
                                                onClick={() => removeHealthTip(idx)}
                                                className="ml-2 p-2 text-red-400 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <textarea
                                            value={tip.items}
                                            onChange={(e) => handleHealthTipChange(idx, "items", e.target.value)}
                                            rows="2"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                            placeholder="Action items (one per line)..."
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Regions */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                    <div className="w-2 h-6 bg-orange-500 rounded-full mr-2"></div>
                                    Regions
                                </h3>
                                <button
                                    type="button"
                                    onClick={addRegion}
                                    className="px-3 py-1 text-sm bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100"
                                >
                                    + Add
                                </button>
                            </div>
                            <div className="space-y-2">
                                {formData.regions.map((region, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={region}
                                            onChange={(e) => handleRegionChange(idx, e.target.value)}
                                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                                            placeholder="Region name"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeRegion(idx)}
                                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Suitable Crops */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center">
                                    <div className="w-2 h-6 bg-yellow-500 rounded-full mr-2"></div>
                                    Suitable Crops
                                </h3>
                                <button
                                    type="button"
                                    onClick={addCrop}
                                    className="px-3 py-1 text-sm bg-yellow-50 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-100"
                                >
                                    + Add
                                </button>
                            </div>
                            <div className="space-y-4">
                                {formData.crops.map((crop, idx) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-xs font-bold text-gray-400">Crop {idx + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeCrop(idx)}
                                                className="text-red-400 hover:text-red-600"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            value={crop.name}
                                            onChange={(e) => handleCropChange(idx, "name", e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg mb-2 text-sm outline-none"
                                            placeholder="Crop Name"
                                        />
                                        <input
                                            type="text"
                                            value={crop.image}
                                            onChange={(e) => handleCropChange(idx, "image", e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                                            placeholder="Image URL"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSoil;
