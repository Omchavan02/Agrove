import React, { useEffect, useRef, useState } from 'react';
import {
    ArrowLeft, Download, Phone, Thermometer, CloudRain, Droplets,
    Sprout, Calendar, Bug, Clock, Leaf, Loader
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { API_BASE } from '../config';

const iconMap = {
    Thermometer,
    CloudRain,
    Droplets
};

const CropAdvisory = ({ data: initialData, cropPath: propCropPath }) => {
    const navigate = useNavigate();
    const { crop } = useParams();
    const cropPath = propCropPath || crop;
    const printRef = useRef(); // Ref for the content to download
    const [downloading, setDownloading] = useState(false);
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(!!cropPath);
    const [error, setError] = useState(null);

    // Fetch data if cropPath is provided
    useEffect(() => {
        if (cropPath) {
            setLoading(true);
            // MongoDB stores paths with a leading slash (e.g. "/rice-advisory")
            // But URL param 'cropPath' might not have it.
            const dbPath = cropPath.startsWith('/') ? cropPath : `/${cropPath}`;
            fetch(`${API_BASE}/api/advisory?path=${dbPath}`)
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch data");
                    return res.json();
                })
                .then(result => {
                    if (Array.isArray(result) && result.length > 0) {
                        setData(result[0]);
                    } else if (!Array.isArray(result) && result) {
                        setData(result);
                    } else {
                        throw new Error("Advisory not found");
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, [cropPath]);

    // Update state if initialData changes (fallback)
    useEffect(() => {
        if (initialData) {
            setData(initialData);
        }
    }, [initialData]);

    // Scroll to top when data loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data]);

    const handleBackToAdvisory = () => {
        navigate(-1);
    };

    const handleDownloadPDF = async () => {
        const element = printRef.current;
        if (!element) return;

        setDownloading(true);
        try {
            console.log("Starting PDF generation...");
            const dataUrl = await toPng(element, { cacheBust: true });
            console.log("Image data URL created");

            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${data.header?.title || data.title}_Advisory.pdf`);
            alert("PDF Downloaded Successfully!");
        } catch (error) {
            console.error("PDF generation failed", error);
            alert(`Failed to generate PDF: ${error.message}`);
        } finally {
            setDownloading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
                <p className="text-xl font-bold">Error loading advisory</p>
                <p>{error}</p>
                <button
                    onClick={() => navigate('/advisory-hub')}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    Back to Hub
                </button>
            </div>
        );
    }

    if (!data) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pb-12">
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* --- Back Button --- */}
                <button
                    className="flex items-center text-gray-600 hover:text-green-600 font-semibold mb-6 transition"
                    onClick={handleBackToAdvisory}
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Advisory Hub
                </button>

                <div
                    className="relative mb-8 rounded-xl overflow-hidden h-48 bg-gray-800 bg-cover bg-center"
                    style={{ backgroundImage: `url('${data.header?.image || data.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"}')` }}
                >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                            <h1 className="text-4xl font-bold mb-3 drop-shadow-md">{data.header?.title || data.title}</h1>
                            <div className="flex flex-wrap justify-center gap-3">
                                {data.header.tags.map((tag, index) => (
                                    <span key={index} className={`${tag.bgClass} text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm`}>
                                        {tag.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- Left Column: Main Content (66% Width) --- */}
                    {/* Attached Ref here to capture only this section */}
                    <div className="lg:col-span-2 space-y-8" ref={printRef}>

                        {/* 1. Overview */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-green-700 mb-3">{data.sections.overview.title}</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {data.sections.overview.content}
                            </p>
                        </section>

                        {/* 2. Ideal Soil & Climate */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <Leaf className="w-5 h-5 mr-2 text-green-600" /> {data.sections.climate.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {data.sections.climate.items.map((item, index) => {
                                    const IconComponent = iconMap[item.iconKey];
                                    return (
                                        <div key={index} className={`${item.colors.bg} p-4 rounded-lg border ${item.colors.border}`}>
                                            <div className={`flex items-center ${item.colors.text} font-bold mb-1`}>
                                                {IconComponent && <IconComponent className="w-4 h-4 mr-2" />} {item.label}
                                            </div>
                                            <p className="text-gray-700 font-medium">{item.value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 3. Sowing/Planting Guide */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                                <Calendar className="w-5 h-5 mr-2" /> {data.sections.sowing.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {data.sections.sowing.items.map((item, index) => (
                                    <div key={index}>
                                        <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                                        <p className="text-gray-800 font-semibold">{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 4. Fertilizer Recommendations */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                                <Sprout className="w-5 h-5 mr-2" /> {data.sections.fertilizer.title}
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            {data.sections.fertilizer.columns.map((col, index) => (
                                                <th key={index} className={`pb-3 font-bold text-gray-600 ${index === 2 ? 'w-1/2' : 'w-1/4'}`}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {data.sections.fertilizer.rows.map((row, index) => (
                                            <tr key={index} className="border-b border-gray-100">
                                                <td className="py-3 font-medium text-gray-800">{row.nutrient}</td>
                                                <td className="py-3 text-gray-600">{row.dosage}</td>
                                                <td className="py-3 text-gray-600">{row.timing}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* 5. Irrigation Schedule */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-blue-600 mb-6 flex items-center">
                                <Droplets className="w-5 h-5 mr-2" /> {data.sections.irrigation.title}
                            </h2>
                            <div className="space-y-6">
                                {data.sections.irrigation.subtitle && (
                                    <p className="text-sm text-gray-600 mb-2">{data.sections.irrigation.subtitle}</p>
                                )}
                                {data.sections.irrigation.items.map((item, index) => (
                                    <div key={index} className={`flex justify-between items-center ${index !== data.sections.irrigation.items.length - 1 ? 'border-b border-gray-100 pb-4' : 'pb-2'}`}>
                                        <div>
                                            <h4 className="font-bold text-gray-800">{item.stage}</h4>
                                            <span className="text-xs text-gray-500 uppercase tracking-wide">{item.time}</span>
                                        </div>
                                        <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm font-medium">{item.method}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 6. Pest & Disease Management */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-red-600 mb-6 flex items-center">
                                <Bug className="w-5 h-5 mr-2" /> {data.sections.pest.title}
                            </h2>
                            <div className="space-y-4">
                                {data.sections.pest.items.map((item, index) => (
                                    <div key={index} className="bg-red-50 border border-red-100 rounded-lg p-4">
                                        <h3 className="font-bold text-red-800 mb-2">{item.name}</h3>
                                        <div className="text-sm space-y-1">
                                            <p><span className="font-semibold text-gray-700">Symptoms:</span> {item.symptoms}</p>
                                            <p><span className="font-semibold text-gray-700">Control:</span> {item.control}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 7. Harvesting Tips */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-yellow-600 mb-3 flex items-center">
                                <Clock className="w-5 h-5 mr-2" /> {data.sections.harvesting.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                {data.sections.harvesting.content}
                            </p>
                        </section>

                    </div>

                    {/* --- Right Column: Sidebar (33% Width) --- */}
                    <div className="lg:col-span-1 space-y-6">

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
    );
};

export default CropAdvisory;
