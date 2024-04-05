"use client"
import React, { createContext, useContext, ReactNode, useState } from 'react';

interface ImageContextType {
  selectedImage: string;
  setSelectedImage: (imageUrl: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const useImage = (): ImageContextType => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImage must be used within a ImageProvider');
  }
  return context;
};

interface ImageProviderProps {
  children: ReactNode;
}

export const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  return (
    <ImageContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </ImageContext.Provider>
  );
};
