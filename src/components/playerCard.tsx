"use client";
import { useEffect, useState } from "react";

export interface CardProps {
  user: string;
  elo: number;
  w: string;
  h: string;
  isKillCard?: boolean;
}

export function ELOCard({ user, elo, w, h, isKillCard }: CardProps) {
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    // Determine the image source based on the elo value
    if (elo < 300) {
      setImageSrc("/Ranks/b1.png");
    } else if (elo < 600) {
      setImageSrc("/Ranks/b3.png");
    } else if (elo < 900) {
      setImageSrc("/Ranks/s1.png");
    } else if (elo < 1200) {
      setImageSrc("/Ranks/s3.png");
    } else if (elo < 1500) {
      setImageSrc("/Ranks/g1.png");
    } else if (elo < 1800) {
      setImageSrc("/Ranks/g3.png");
    } else {
      setImageSrc("/Ranks/champ.png");
    }
  }, [elo]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback image if the specified image fails to load
    e.currentTarget.src = "/Ranks/fallback.png"; // Add a fallback image in the public folder
  };

  return (
    <div className={`${w} ${h} mx-auto border rounded-lg overflow-hidden bg-white mt-6 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800`}>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center font-bold py-3">
        {user}
      </div>
      {/* Image Section */}
      <div className="bg-indigo-50 flex justify-center items-center py-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex justify-center items-center border-4 border-indigo-500 shadow-md">
          <img
            src={imageSrc || "/Ranks/fallback.png"}
            alt={`Rank for ${user}`}
            className="w-full h-full object-cover"
            onError={handleImageError} // Handle image loading errors
          />
        </div>
      </div>
      {/* Conditional Stats Section */}
      {!isKillCard && (
        <div className="bg-indigo-50 text-gray-800 p-6">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="font-semibold">Matches Played</span>
            <span className="text-indigo-600 font-bold">10</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="font-semibold">Matches Won</span>
            <span className="text-green-600 font-bold">7</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="font-semibold">Matches Lost</span>
            <span className="text-red-600 font-bold">3</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-semibold">ELO</span>
            <span className="text-purple-600 font-bold">{elo}</span>
          </div>
        </div>
      )}
      {isKillCard && (
        <div className="bg-indigo-50 text-gray-800">
          <div className="text-center">
            <span className="text-purple-600 font-bold block pb-4">{elo}</span>
          </div>
        </div>
      )}
    </div>
  );
}