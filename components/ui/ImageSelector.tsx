"use client"

import React, { useEffect, useState } from 'react';
import { useImage } from './ImageContext'; // Adjust the path as necessary
import fetchImages from '@/lib/supabase/fetchImages';

const ImageSelector: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const { setSelectedImage } = useImage();

  useEffect(() => {
    const loadImages = async () => {
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
    };
    loadImages();
  }, []);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div>
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Uploaded image ${index}`}
          onClick={() => handleImageSelect(imageUrl)}
          style={{ width: 100, cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export default ImageSelector;
