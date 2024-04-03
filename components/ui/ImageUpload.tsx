"use client";

import React from 'react';
import { redirect } from "next/navigation";
import { createClient } from '@/lib/supabase/client';


// Type for the event parameter is React.ChangeEvent<HTMLInputElement>
const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
    return;
  }

  if (!event.target.files || event.target.files.length === 0) {
    alert('No file selected.');
    return;
  }

  const file = event.target.files[0];
  const bucket: string = process.env.NEXT_PUBLIC_IMAGE_BUCKET!;
  console.log(bucket)
  const filePath: string = `${user.id}/${file.name}`; // Creates a user-specific path

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) {
    alert('Error uploading file.');
    console.log(error);
    return;
  }

  alert('File uploaded successfully!');
};

const ImageUpload: React.FC = () => {
  return (
    <input type="file" onChange={uploadFile} />
  );
};

export default ImageUpload;
