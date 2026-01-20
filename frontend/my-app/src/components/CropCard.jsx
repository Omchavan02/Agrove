import React from 'react';
import { useNavigate } from 'react-router-dom';

const CropCard = ({ image, title, description, type, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      sessionStorage.setItem("advisoryScrollPosition", window.scrollY);
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      // navigate requires the URL path parameter, which is defined as /advisory/:crop in App.jsx
      // If path is "/rice-advisory", we want to go to "/advisory/rice-advisory"
      // Wait, let's check App.jsx again. Route is /advisory/:crop
      // So if I perform navigate('/advisory/rice-advisory'), params.crop will be "rice-advisory"
      // But let's be careful about double slashes.
      const slug = path.startsWith('/') ? path.substring(1) : path;
      navigate(`/advisory/${slug}`);
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition cursor-pointer group"
      onClick={handleClick}
    >
      <div className="h-40 overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {type && (
          <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${type === 'Rabi' ? 'bg-orange-100 text-orange-700' :
            type === 'Kharif' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            }`}>
            {type}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default CropCard;