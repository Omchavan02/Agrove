import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Search, Loader } from 'lucide-react';
import { API_BASE } from '../config';

const ManageAdvisory = () => {
    const navigate = useNavigate();
    const [advisories, setAdvisories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch Advisories
    const fetchAdvisories = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/api/advisory`);
            const data = await res.json();
            setAdvisories(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvisories();
    }, []);

    // Filter Logic
    const filteredAdvisories = advisories.filter(crop =>
        crop.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle Edit Navigation
    const handleEdit = (crop) => {
        navigate(`/edit-advisory/${crop._id}`);
    };

    // Handle Add Navigation
    const handleAdd = () => {
        navigate(`/edit-advisory`);
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this advisory?")) return;

        const token = localStorage.getItem('adminToken');
        if (!token) return;

        try {
            const res = await fetch(`${API_BASE}/api/admin/advisory/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error("Delete failed");

            fetchAdvisories();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Advisories</h1>
                        <p className="text-gray-500">Add, edit, or remove crop advisories</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/admin-dashboard')}
                            className="flex items-center px-4 py-2 bg-white text-gray-600 rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </button>
                        <button
                            onClick={handleAdd}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Crop
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-4">
                    <Search className="text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search crops..."
                        className="flex-1 outline-none text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* List View */}
                {loading ? (
                    <div className="flex justify-center py-20"><Loader className="animate-spin text-green-600 w-8 h-8" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAdvisories.map((crop) => (
                            <div key={crop._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={crop.image} alt={crop.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700">
                                        {crop.season}
                                    </span>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{crop.title}</h3>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{crop.description}</p>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(crop)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(crop._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded text-gray-600">
                                            {crop.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAdvisory;
