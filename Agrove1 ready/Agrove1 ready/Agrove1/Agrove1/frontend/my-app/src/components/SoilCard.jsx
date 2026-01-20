import React from 'react';
import { useNavigate } from 'react-router-dom';

const SoilCard = ({ soil }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        sessionStorage.setItem("advisoryScrollPosition", window.scrollY);
        navigate(`/soil/${soil.uid}`);
      }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer group"
    >
      <div className="h-40 overflow-hidden">
        <img
          src={soil.image || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"}
          alt={soil.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{soil.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{soil.desc}</p>
      </div>
    </div>
  );
};

export default SoilCard;