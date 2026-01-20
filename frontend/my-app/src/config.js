// Automatically selects the correct API URL
// In Vercel, set VITE_API_BASE_URL env variable to your Render Backend URL
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
