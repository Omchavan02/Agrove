import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Export from "./pages/Export";
import Dashboard from "./pages/Dashboard";
import AdvisoryHub from "./pages/AdvisoryHub";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CropAdvisory from "./components/CropAdvisory";
import SoilDetails from "./pages/SoilDetails";
import ManageAdvisory from "./pages/ManageAdvisory";
import EditAdvisory from "./pages/EditAdvisory";
import ManageSoils from "./pages/ManageSoils";
import EditSoil from "./pages/EditSoil";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/advisory-hub" element={<AdvisoryHub />} />
        <Route path="/advisory/:crop" element={<CropAdvisory />} /> {/* Make sure this matches how you link to it */}
        <Route path="/soil/:id" element={<SoilDetails />} />
        {/* Admin Management (Ensure these are protected by your new login) */}
        <Route path="/manage-advisory" element={<ManageAdvisory />} />
        <Route path="/edit-advisory/:id?" element={<EditAdvisory />} /> {/* Handles both Add and Edit */}

        <Route path="/admin/soils" element={<ManageSoils />} />
        <Route path="/admin/edit-soil/:id?" element={<EditSoil />} /> {/* Handles both Add and Edit */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* 🔒 PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/activities"
          element={
            <PrivateRoute>
              <Activities />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/export"
          element={
            <PrivateRoute>
              <Export />
            </PrivateRoute>
          }
        />
      </Routes>



      <Footer />
    </>
  );
}

export default App;
