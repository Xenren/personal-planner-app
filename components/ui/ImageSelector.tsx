"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useImage } from "@/components/ui/ImageContext";
import { createClient } from "@/lib/supabase/client";
import fetchImages from "@/lib/supabase/fetchImages";

const supabase = createClient();
const bucketName = process.env.NEXT_PUBLIC_IMAGE_BUCKET!;

const ImageSelector: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const { setSelectedImage } = useImage();

  useEffect(() => {
    const loadImages = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("active user session:", user);

      if (!user) {
        console.error("user not found");
        return;
      }

      const fetchedFiles = await fetchImages(user.id);
      if (!fetchedFiles) {
        console.error("No images found or error in fetching");
        return;
      }

      const imageUrls = await Promise.all(
        fetchedFiles.map(async (file) => {
          const { data, error } = await supabase.storage
            .from(bucketName)
            .download(`${user.id}/${file.name}`);

          if (error) {
            console.error("Encountered Error:", error);
            return "";
          }

          return URL.createObjectURL(data);
        }),
      );

      setImages(imageUrls.filter((url) => url));
    };
    loadImages();
  }, []);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="grid grid-cols-2 gap-y-9 overflow-y-scroll">
      {images.map((imageUrl, index) => (
        <div
          className="cursor-pointer"
          key={index}
          onClick={() => handleImageSelect(imageUrl)}
          style={{ position: "relative", width: 150, height: 100 }}
        >
          <Image
            src={imageUrl}
            alt={`Uploaded image ${index}`}
            width="100"
            height="100"
            className="w-48 h-32 bg-cover rounded-xl object-cover"
          />
        </div>
      ))}
    </div>
  );
};
export default ImageSelector;
