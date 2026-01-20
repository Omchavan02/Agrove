import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft, Save, Plus, Trash2, Calendar, Sprout,
    Droplets, Bug, Clock, Leaf, Thermometer, CloudRain
} from 'lucide-react';
import { API_BASE } from '../config';

const EditAdvisory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const [loading, setLoading] = useState(false);

    // Initial State matching specific JSON structure
    const [data, setData] = useState({
        title: '',
        description: '',
        category: 'Food Crops',
        season: 'Kharif',
        soilTypes: [],
        regions: [],
        image: '',
        path: '',
        header: {
            title: '',
            image: '',
            imageAlt: '',
            tags: []
        },
        sections: {
            overview: { title: 'Overview', content: '' },
            climate: {
                title: 'Ideal Soil & Climate',
                items: []
            },
            sowing: {
                title: 'Sowing/Planting Guide',
                items: []
            },
            fertilizer: {
                title: 'Fertilizer Recommendations',
                columns: ['Nutrient', 'Dosage', 'Timing'],
                rows: []
            },
            irrigation: {
                title: 'Irrigation Schedule',
                items: []
            },
            pest: {
                title: 'Pest & Disease Management',
                items: []
            },
            harvesting: { title: 'Harvesting Tips', content: '' }
        }
    });

    useEffect(() => {
        if (isEditing) {
            fetchAdvisory();
        }
    }, [id]);

    const fetchAdvisory = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) {
                alert("Unauthorized");
                navigate('/login');
                return;
            }

            const res = await fetch(`${API_BASE}/api/admin/advisory/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch advisory details");
            }

            const found = await res.json();
            if (found) {
                // Merge with default structure to ensure all sections exist
                // Deep merge to ensure nested structures (header, sections) exist
                setData(prev => ({
                    ...prev,
                    ...found,
                    header: {
                        ...prev.header,
                        ...(found.header || {})
                    },
                    sections: {
                        ...prev.sections,
                        ...(found.sections || {}),
                        overview: { ...prev.sections.overview, ...(found.sections?.overview || {}) },
                        climate: { ...prev.sections.climate, ...(found.sections?.climate || {}) },
                        sowing: { ...prev.sections.sowing, ...(found.sections?.sowing || {}) },
                        fertilizer: { ...prev.sections.fertilizer, ...(found.sections?.fertilizer || {}) },
                        irrigation: { ...prev.sections.irrigation, ...(found.sections?.irrigation || {}) },
                        pest: { ...prev.sections.pest, ...(found.sections?.pest || {}) },
                        harvesting: { ...prev.sections.harvesting, ...(found.sections?.harvesting || {}) }
                    }
                }));
            }
        } catch (err) {
            console.error(err);
            alert("Error loading advisory");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        const token = localStorage.getItem('adminToken');
        if (!token) return alert("Unauthorized");

        const url = isEditing
            ? `${API_BASE}/api/admin/advisory/${id}`
            : `${API_BASE}/api/admin/advisory`;

        const method = isEditing ? 'PUT' : 'POST';

        try {
            // Ensure header fields are populated
            const payload = { ...data };
            if (!payload.header.title) payload.header.title = payload.title;
            if (!payload.header.image) payload.header.image = payload.image;

            // Enforce leading slash on path
            if (payload.path && !payload.path.startsWith('/')) {
                payload.path = `/${payload.path}`;
            }

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("Saved Successfully!");
            navigate('/manage-advisory');
        } catch (err) {
            alert(err.message);
        }
    };

    // --- Helpers for Nested Updates ---

    // Update simple fields
    const updateField = (field, value) => setData(prev => ({ ...prev, [field]: value }));

    // Update Header
    const updateHeader = (field, value) => setData(prev => ({ ...prev, header: { ...prev.header, [field]: value } }));

    // Update Section Title/Content
    const updateSection = (section, field, value) => ({
        ...data,
        sections: {
            ...data.sections,
            [section]: { ...data.sections[section], [field]: value }
        }
    });

    // Helper for Arrays in Sections (Climate, Sowing, etc)
    const addItem = (section, itemTemplate) => {
        setData(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [section]: {
                    ...prev.sections[section],
                    items: [...prev.sections[section].items, itemTemplate]
                }
            }
        }));
    };

    const removeItem = (section, index) => {
        setData(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [section]: {
                    ...prev.sections[section],
                    items: prev.sections[section].items.filter((_, i) => i !== index)
                }
            }
        }));
    };

    const updateItem = (section, index, field, value) => {
        setData(prev => {
            const newItems = [...prev.sections[section].items];
            newItems[index] = { ...newItems[index], [field]: value };
            return {
                ...prev,
                sections: {
                    ...prev.sections,
                    [section]: { ...prev.sections[section], items: newItems }
                }
            };
        });
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-12 font-sans">

            {/* Top Bar */}
            <div className="bg-white shadow sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/manage-advisory')} className="text-gray-500 hover:text-gray-800">
                        <ArrowLeft />
                    </button>
                    <h1 className="text-xl font-bold">{isEditing ? 'Edit Advisory' : 'Create New Advisory'}</h1>
                </div>
                <button onClick={handleSave} className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold flex items-center hover:bg-green-700">
                    <Save className="w-5 h-5 mr-2" /> Save Changes
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

                {/* --- Metadata Card --- */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-lg font-bold mb-4 text-gray-800">Metadata (Database Fields)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input className="p-2 border rounded" placeholder="Title" value={data.title} onChange={e => updateField('title', e.target.value)} />
                        <select className="p-2 border rounded" value={data.category} onChange={e => updateField('category', e.target.value)}>
                            {["Food Crops", "Cash Crops", "Plantation Crops", "Horticultural Crops", "Fibre Crops"].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input className="p-2 border rounded" placeholder="Image URL" value={data.image} onChange={e => updateField('image', e.target.value)} />
                        <input className="p-2 border rounded" placeholder="Route Path (/crop-name)" value={data.path} onChange={e => updateField('path', e.target.value)} />
                    </div>
                </div>

                {/* --- Visual Editor (Mimics CropAdvisory) --- */}

                {/* Header Image */}
                <div
                    className="relative rounded-xl overflow-hidden h-48 bg-gray-200 group bg-cover bg-center"
                    style={{ backgroundImage: `url(${data.header.image || data.image})` }}
                >
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 space-y-4 z-10">
                        <input
                            className="text-4xl font-bold text-center bg-transparent text-white placeholder-white/70 outline-none border-b border-white/30 focus:border-white w-full max-w-lg"
                            placeholder="Header Title"
                            value={data.header.title || data.title}
                            onChange={e => updateHeader('title', e.target.value)}
                        />
                        <input
                            className="text-sm text-center bg-black/50 text-white p-2 rounded w-full max-w-md"
                            placeholder="Header Image URL (updates above)"
                            value={data.header.image}
                            onChange={e => updateHeader('image', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Overview */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-green-700 mb-3">{data.sections.overview.title}</h2>
                            <textarea
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 h-32"
                                placeholder="Enter overview content..."
                                value={data.sections.overview.content}
                                onChange={e => setData(updateSection('overview', 'content', e.target.value))}
                            />
                        </section>

                        {/* 2. Climate */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center"><Leaf className="w-5 h-5 mr-2 text-green-600" /> Climate</h2>
                                <button onClick={() => addItem('climate', { label: 'Metric', value: 'Value', iconKey: 'Thermometer', colors: { bg: 'bg-green-50', text: 'text-green-700' } })} className="text-sm text-green-600 font-bold flex items-center"><Plus className="w-4 h-4 mr-1" /> Add Item</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {data.sections.climate.items.map((item, idx) => (
                                    <div key={idx} className="p-4 rounded-lg border border-gray-200 relative group">
                                        <button onClick={() => removeItem('climate', idx)} className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                        <input className="block w-full text-sm font-bold mb-1" value={item.label} onChange={e => updateItem('climate', idx, 'label', e.target.value)} placeholder="Label" />
                                        <input className="block w-full text-gray-700" value={item.value} onChange={e => updateItem('climate', idx, 'value', e.target.value)} placeholder="Value" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Sowing */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center"><Calendar className="w-5 h-5 mr-2 text-green-600" /> Sowing Guide</h2>
                                <button onClick={() => addItem('sowing', { label: 'Criterion', value: 'Details' })} className="text-sm text-green-600 font-bold flex items-center"><Plus className="w-4 h-4 mr-1" /> Add Guide</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.sections.sowing.items.map((item, idx) => (
                                    <div key={idx} className="border p-3 rounded relative group">
                                        <button onClick={() => removeItem('sowing', idx)} className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                        <input className="font-medium text-sm w-full mb-1" value={item.label} onChange={e => updateItem('sowing', idx, 'label', e.target.value)} placeholder="Label (e.g. Sowing Time)" />
                                        <input className="font-semibold text-gray-800 w-full" value={item.value} onChange={e => updateItem('sowing', idx, 'value', e.target.value)} placeholder="Value" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Fertilizer */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-gray-800 flex items-center"><Sprout className="w-5 h-5 mr-2 text-green-600" /> Fertilizer</h2>
                                <button onClick={() => {
                                    setData(prev => ({
                                        ...prev,
                                        sections: { ...prev.sections, fertilizer: { ...prev.sections.fertilizer, rows: [...prev.sections.fertilizer.rows, { nutrient: '', dosage: '', timing: '' }] } }
                                    }))
                                }} className="text-sm text-green-600 font-bold flex items-center"><Plus className="w-4 h-4 mr-1" /> Add Row</button>
                            </div>
                            <div className="space-y-2">
                                {data.sections.fertilizer.rows.map((row, idx) => (
                                    <div key={idx} className="flex gap-2 items-center">
                                        <input className="border p-2 rounded flex-1" placeholder="Nutrient" value={row.nutrient} onChange={e => {
                                            const newRows = [...data.sections.fertilizer.rows];
                                            newRows[idx].nutrient = e.target.value;
                                            setData(prev => ({ ...prev, sections: { ...prev.sections, fertilizer: { ...prev.sections.fertilizer, rows: newRows } } }));
                                        }} />
                                        <input className="border p-2 rounded flex-1" placeholder="Dosage" value={row.dosage} onChange={e => {
                                            const newRows = [...data.sections.fertilizer.rows];
                                            newRows[idx].dosage = e.target.value;
                                            setData(prev => ({ ...prev, sections: { ...prev.sections, fertilizer: { ...prev.sections.fertilizer, rows: newRows } } }));
                                        }} />
                                        <input className="border p-2 rounded flex-1" placeholder="Timing" value={row.timing} onChange={e => {
                                            const newRows = [...data.sections.fertilizer.rows];
                                            newRows[idx].timing = e.target.value;
                                            setData(prev => ({ ...prev, sections: { ...prev.sections, fertilizer: { ...prev.sections.fertilizer, rows: newRows } } }));
                                        }} />
                                        <button onClick={() => {
                                            const newRows = data.sections.fertilizer.rows.filter((_, i) => i !== idx);
                                            setData(prev => ({ ...prev, sections: { ...prev.sections, fertilizer: { ...prev.sections.fertilizer, rows: newRows } } }));
                                        }} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 5. Irrigation */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-blue-600 flex items-center"><Droplets className="w-5 h-5 mr-2" /> Irrigation Schedule</h2>
                                <button onClick={() => addItem('irrigation', { stage: '', time: '', method: '' })} className="text-sm text-blue-600 font-bold flex items-center"><Plus className="w-4 h-4 mr-1" /> Add Schedule</button>
                            </div>
                            <div className="space-y-4">
                                {data.sections.irrigation.items.map((item, idx) => (
                                    <div key={idx} className="bg-blue-50 border border-blue-100 rounded-lg p-4 relative group">
                                        <button onClick={() => removeItem('irrigation', idx)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <input className="bg-white border p-2 rounded text-sm font-bold" placeholder="Stage (e.g. Germination)" value={item.stage} onChange={e => updateItem('irrigation', idx, 'stage', e.target.value)} />
                                            <input className="bg-white border p-2 rounded text-sm" placeholder="Time (e.g. 0-15 Days)" value={item.time} onChange={e => updateItem('irrigation', idx, 'time', e.target.value)} />
                                            <input className="bg-white border p-2 rounded text-sm" placeholder="Method (e.g. Light Irrigation)" value={item.method} onChange={e => updateItem('irrigation', idx, 'method', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 5. Pest */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-red-600 flex items-center"><Bug className="w-5 h-5 mr-2" /> Pest & Disease</h2>
                                <button onClick={() => addItem('pest', { name: '', symptoms: '', control: '' })} className="text-sm text-red-600 font-bold flex items-center"><Plus className="w-4 h-4 mr-1" /> Add Pest</button>
                            </div>
                            <div className="space-y-4">
                                {data.sections.pest.items.map((item, idx) => (
                                    <div key={idx} className="bg-red-50 border border-red-100 rounded-lg p-4 relative group">
                                        <button onClick={() => removeItem('pest', idx)} className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                                        <input className="bg-white border mb-2 w-full p-2 rounded text-red-800 font-bold" placeholder="Pest Name" value={item.name} onChange={e => updateItem('pest', idx, 'name', e.target.value)} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input className="bg-white border w-full p-2 rounded text-sm" placeholder="Symptoms" value={item.symptoms} onChange={e => updateItem('pest', idx, 'symptoms', e.target.value)} />
                                            <input className="bg-white border w-full p-2 rounded text-sm" placeholder="Control" value={item.control} onChange={e => updateItem('pest', idx, 'control', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 6. Harvest */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-yellow-600 mb-3 flex items-center"><Clock className="w-5 h-5 mr-2" /> Harvesting Tips</h2>
                            <textarea
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-yellow-500 h-32"
                                placeholder="Enter harvesting tips..."
                                value={data.sections.harvesting.content}
                                onChange={e => setData(updateSection('harvesting', 'content', e.target.value))}
                            />
                        </section>

                    </div>
                    {/* Right Column - Placeholder for now */}
                    <div className="lg:col-span-1">
                        <div className="bg-blue-50 p-6 rounded-xl text-blue-800">
                            <h3 className="font-bold mb-2">Editor Info</h3>
                            <p className="text-sm">This visual editor lets you update the rich content of the advisory page. Changes are saved to the primary database.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditAdvisory;
