"use client"
import React, { useEffect, useState } from 'react';
import fetchImages from '@/lib/supabase/fetchImages';

const ImageSelector: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    // update the existing image with the selected one
  };

  return (
    <div>
      <div>
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Uploaded image ${imageUrl}`}
            onClick={() => handleImageSelect(imageUrl)}
            style={{ width: 100, cursor: 'pointer' }}
          />
        ))}
      </div>
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          <img src={selectedImage} alt="Selected" style={{ width: 200 }} />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
