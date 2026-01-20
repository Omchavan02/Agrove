import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import {
    ArrowLeft, Download, Phone, Sprout,
    FlaskConical, AlertTriangle, Layers, Palette, Droplets, Leaf, TestTube, Sun, Loader
} from 'lucide-react';
import { API_BASE } from '../config';

const iconMap = {
    FlaskConical, AlertTriangle, Layers, Palette, Droplets, Leaf, TestTube, Sun
};

const SoilDetails = () => {
    const { id } = useParams(); // 'id' matches the 'uid' from the URL (e.g. 'alluvial')
    const navigate = useNavigate();
    const [soil, setSoil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const printRef = useRef();
    const [downloading, setDownloading] = useState(false);

    const handleDownloadPDF = async () => {
        const element = printRef.current;
        if (!element) return;

        setDownloading(true);
        try {
            console.log("Starting PDF generation...");
            const dataUrl = await toPng(element, { cacheBust: true });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${soil.name}_Advisory.pdf`);
            alert("PDF Downloaded Successfully!");
        } catch (error) {
            console.error("PDF generation failed", error);
            alert(`Failed to generate PDF: ${error.message}`);
        } finally {
            setDownloading(false);
        }
    };

    useEffect(() => {
        if (soil) {
            window.scrollTo(0, 0);
        }
    }, [soil]);

    useEffect(() => {
        const fetchSoil = async () => {
            try {
                // Fetch by UID (which is passed as 'id' in the URL params)
                const res = await fetch(`${API_BASE}/api/soils/${id}`);
                if (!res.ok) throw new Error("Soil not found");
                const data = await res.json();
                setSoil(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSoil();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-[#FDFBF7]">
                <Loader className="animate-spin text-green-600 w-12 h-12" />
            </div>
        );
    }

    if (error || !soil) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-[#FDFBF7] text-gray-600">
                <h2 className="text-2xl font-serif mb-4">Soil Profile Not Found</h2>
                <button
                    onClick={() => navigate('/advisory')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Back to Hub
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans text-gray-800 pb-12 selection:bg-green-100 selection:text-green-900">

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* --- Back Button --- */}
                <button
                    className="flex items-center text-gray-600 hover:text-green-600 font-semibold mb-6 transition"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Advisory Hub
                </button>

                <div
                    className="relative mb-8 rounded-xl overflow-hidden h-48 bg-gray-800 bg-cover bg-center"
                    style={{ backgroundImage: `url('${soil.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"}')` }}
                >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                            <h1 className="text-4xl font-bold mb-3 drop-shadow-md">{soil.name}</h1>
                            {/* <div className="flex flex-wrap justify-center gap-3">
                                <span className="bg-green-600/80 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                                    {soil.type || "Soil Type"}
                                </span>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-6 relative z-30">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* --- Left Column: Main Content (8 cols) --- */}
                        <div className="lg:col-span-8 space-y-10" ref={printRef}>

                            {/* Overview Card */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h2 className="text-xl font-bold text-green-700 mb-4 pb-2 border-b border-gray-100">
                                    Overview
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {soil.desc}
                                </p>
                            </div>

                            {/* Key Characteristics (Icon Grid) */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {soil.characteristics.map((char, index) => {
                                    const Icon = iconMap[char.icon] || Droplets;
                                    return (
                                        <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start">
                                            <div className="bg-green-50 p-2 rounded-lg mr-3">
                                                <Icon className="w-5 h-5 text-green-700" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-800 text-sm mb-1">{char.text}</h4>
                                                {char.description && (
                                                    <ul className="text-xs text-gray-600 space-y-0.5 pl-4 list-disc">
                                                        {char.description.map((d, i) => (
                                                            <li key={i}>{d}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Suitable Crops (Grid) */}
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                                    <Sprout className="w-5 h-5 mr-2 text-green-600" />
                                    Suitable Crops
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {soil.crops.map((crop, index) => (
                                        <div key={index} className="flex flex-col items-center text-center group">
                                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm group-hover:shadow-md group-hover:border-green-300 transition-all duration-300">
                                                <img
                                                    src={crop.image}
                                                    alt={crop.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="mt-2 text-sm font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                                                {crop.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Regions, Conclusion & Remediation Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Left Side: Regions & Conclusion */}
                                <div className="space-y-6">
                                    {/* Regions */}
                                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                            <Layers className="w-5 h-5 mr-2 text-green-600" /> Major Regions
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {soil.regions.map((region, idx) => (
                                                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                    {region}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Conclusion (Moved here to fill space) */}
                                    {soil.conclusion && (
                                        <div className="bg-yellow-50 rounded-xl p-6 shadow-sm border border-yellow-100">
                                            <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                                                🌟 Farmer-Friendly Conclusion
                                            </h3>
                                            <p className="text-yellow-900 text-sm leading-relaxed">
                                                {soil.conclusion}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side: Remediation / Health Tips */}
                                <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100 h-full">
                                    <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                                        <TestTube className="w-5 h-5 mr-2" /> Soil Health Tips
                                    </h3>
                                    {soil.healthTips ? (
                                        <div className="space-y-4">
                                            {soil.healthTips.map((tip, idx) => (
                                                <div key={idx}>
                                                    <h4 className="font-bold text-green-900 text-sm flex items-center mb-1">
                                                        ✅ {tip.title}
                                                    </h4>
                                                    <ul className="text-xs text-green-800 space-y-0.5 pl-5 list-disc">
                                                        {tip.items.map((item, i) => (
                                                            <li key={i}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-green-900 text-sm leading-relaxed">
                                            {soil.remediation}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- Right Column: Sidebar (4 cols) --- */}
                        <div className="lg:col-span-4 space-y-6">

                            {/* Expert Contact Card (Visually Distinct) */}
                            {/* Quick Actions Card */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>

                                <button
                                    onClick={handleDownloadPDF}
                                    disabled={downloading}
                                    className="w-full flex items-center justify-center bg-green-50 text-green-700 font-bold py-3 px-4 rounded-lg border border-green-200 hover:bg-green-100 transition mb-3 disabled:opacity-50"
                                >
                                    {downloading ? <Loader className="w-5 h-5 mr-2 animate-spin" /> : <Download className="w-5 h-5 mr-2" />}
                                    {downloading ? "Generating PDF..." : "Download PDF Advisory"}
                                </button>

                                <button className="w-full flex items-center justify-center bg-white text-gray-700 font-bold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Contact Expert
                                </button>

                                {/* Need Help Section */}
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <h3 className="text-gray-800 font-bold mb-2">Need Help?</h3>
                                    <p className="text-sm text-gray-500 mb-2">Our agricultural experts are available 24/7 to answer your questions.</p>
                                    <p className="font-bold text-green-600 text-lg">Helpline: 1800-123-4567</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoilDetails;
