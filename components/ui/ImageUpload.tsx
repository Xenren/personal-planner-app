import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const ImageUpload: React.FC = () => {
  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

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

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" onChange={uploadFile} />
    </div>
  );
};

export default ImageUpload;
