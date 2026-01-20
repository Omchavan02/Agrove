import React from "react";
import CropCard from "./CropCard";
import cropsData from "../data/cropsData";

const CropsGrid = ({ crops }) => {
  const displayCrops = crops || cropsData;
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h2 className="text-2xl font-bold mb-6">
        Crops We Cover
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayCrops.map((crop) => (
          <CropCard
            key={crop.id}
            image={crop.image}
            title={crop.title}
            description={crop.description}
            type={crop.type}
            path={crop.path}
          />
        ))}
      </div>

    </div>
  );
};

export default CropsGrid;