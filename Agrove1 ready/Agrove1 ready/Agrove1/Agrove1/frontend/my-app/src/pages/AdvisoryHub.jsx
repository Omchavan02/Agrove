import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import CropsGrid from '../components/CropsGrid';
import SoilCard from '../components/SoilCard';
import { API_BASE } from '../config';


const AdvisoryHub = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Crops");
    const [selectedSoil, setSelectedSoil] = useState("All Soil Types");


    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [soils, setSoils] = useState([]);

    // Scroll Restoration Logic
    useLayoutEffect(() => {
        const savedPosition = sessionStorage.getItem("advisoryScrollPosition");
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition, 10));
        } else {
            window.scrollTo(0, 0);
        }
    }, [loading]); // Run when loading state changes (initially true -> false)

    useEffect(() => {
        const params = new URLSearchParams({
            search: searchQuery,
            category: selectedCategory,
            soil: selectedSoil,
        });

        setLoading(true);
        fetch(`${API_BASE}/api/advisory?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setCrops(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [searchQuery, selectedCategory, selectedSoil]);

    useEffect(() => {
        // Fetch soils data
        fetch(`${API_BASE}/api/soils`)
            .then(res => res.json())
            .then(data => setSoils(data))
            .catch(err => console.error("Error fetching soils:", err));
    }, []);

    // Filter Logic
    const filteredCrops = useMemo(() => {
        return crops.filter(crop => {
            // Search Filter
            const matchesSearch = crop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                crop.description.toLowerCase().includes(searchQuery.toLowerCase());

            // Category Filter
            const matchesCategory = selectedCategory === "All Crops" || crop.category === selectedCategory;

            // Soil & Region Filters (Placeholder logic as data is currently missing in cropsData)
            // Ideally, we would check: crop.soilTypes.includes(selectedSoil)
            const matchesSoil = selectedSoil === "All Soil Types" || true;

            return matchesSearch && matchesCategory && matchesSoil;
        });
    }, [crops, searchQuery, selectedCategory, selectedSoil]);



    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">

            {/* --- Hero Section --- */}
            <div className="text-center relative">
                <img
                    src="https://res.cloudinary.com/dkdmefrit/image/upload/v1767461949/Farm_y8ji5g.png"
                    alt="Agricultural advisory"
                    className="w-full h-[400px] object-cover shadow-lg filter brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl drop-shadow-md">Expert Agricultural Advisory</h1>
                    <p className="text-lg md:text-xl max-w-2xl drop-shadow-sm">Personalized crop and soil advice to maximize your yield.</p>
                </div>
            </div>

            {/* --- Main Content Layout --- */}
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Search Bar (Floating effect) */}
                <div className="relative -mt-16 mb-12 max-w-3xl mx-auto z-10">
                    <div className="relative">
                        <Search className="absolute left-5 top-4 h-6 w-6 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for crops (e.g., Rice, Wheat)..."
                            className="w-full pl-14 pr-6 py-4 rounded-xl shadow-xl border-none ring-1 ring-gray-100 focus:ring-4 focus:ring-green-500/20 outline-none text-lg text-gray-800 placeholder-gray-400 bg-white transition-all"
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* --- Sidebar (Filters) --- */}
                    <aside className="w-full lg:w-1/4 min-w-[280px]">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-green-700 font-bold text-xl">
                                <Filter className="h-5 w-5" />
                                <span>Filters</span>
                            </div>

                            {/* Filter 1: Crop Type */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Crop Type</label>
                                <div className="relative">
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="block w-full pl-4 pr-10 py-3 text-base border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-lg appearance-none cursor-pointer transition-shadow"
                                    >
                                        <option value="All Crops">All Crops</option>
                                        <option value="Food Crops">Food Crops</option>
                                        <option value="Cash Crops">Cash Crops</option>
                                        <option value="Fibre Crops">Fibre Crops</option>
                                        <option value="Plantation Crops">Plantation Crops</option>
                                        <option value="Horticultural Crops">Horticultural Crops</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            {/* Filter 2: Soil Type */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Soil Type</label>
                                <div className="relative">
                                    <select
                                        value={selectedSoil}
                                        onChange={(e) => setSelectedSoil(e.target.value)}
                                        className="block w-full pl-4 pr-10 py-3 text-base border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent rounded-lg appearance-none cursor-pointer transition-shadow"
                                    >
                                        <option value="All Soil Types">All Soil Types</option>
                                        <option value="Alluvial">Alluvial</option>
                                        <option value="Black">Black</option>
                                        <option value="Red">Red</option>
                                        <option value="Laterite">Laterite</option>
                                        <option value="Arid (Desert)">Arid (Desert)</option>
                                        <option value="Forest">Forest</option>
                                        <option value="Saline/Alkaline">Saline/Alkaline</option>
                                        <option value="Peaty">Peaty</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-3.5 h-4 w-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>



                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("All Crops");
                                    setSelectedSoil("All Soil Types");

                                }}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 rounded-lg transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* --- Content Area --- */}
                    <main className="w-full lg:w-3/4">

                        {/* Section 1: Crop Advisory */}
                        <div className="mb-12">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 border-b border-gray-200 pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Crop Advisory</h2>
                                    <p className="text-sm text-gray-500 mt-1">Found {filteredCrops.length} crops matching your criteria</p>
                                </div>
                            </div>

                            {loading ? (
                                <p className="text-center">Loading crops...</p>
                            ) : (
                                <CropsGrid crops={filteredCrops} />
                            )}
                        </div>

                        {/* Section 2: Soil Type Advisory */}
                        <div>
                            <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
                                <h2 className="text-2xl font-bold text-gray-900">Soil Type Advisory</h2>
                                <span className="text-sm text-gray-500 hidden sm:inline-block">Understanding your soil</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {soils.map((soil) => (
                                    <SoilCard key={soil._id} soil={soil} />
                                ))}
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdvisoryHub;