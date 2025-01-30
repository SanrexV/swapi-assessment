import React from "react";
import Image from "next/image";

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
};

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="w-48 rounded-2xl overflow-hidden shadow-lg bg-white cursor-pointer">
      {imageUrl && (
        <Image
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={title}
          width={400}
          height={192}
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
