import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, FileText, LogOut, Layers } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Implementation for logout logic (e.g., clearing tokens) will go here
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-md text-center">

                <div className="mb-6 flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                        <Shield className="w-10 h-10 text-green-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-500 mb-8">Welcome back, Admin. Manage your application settings and content here.</p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/manage-advisory')}
                        className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                    >
                        <FileText className="w-5 h-5 mr-2" />
                        Manage Advisory
                    </button>

                    <button
                        onClick={() => navigate('/admin/soils')}
                        className="w-full flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors"
                    >
                        <Layers className="w-5 h-5 mr-2" />
                        Manage Soils
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                    >
                        <LogOut className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
