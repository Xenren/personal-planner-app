"use client"

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import ImageSelector from '@/components/ui/ImageSelector';
import ImageUpload from '@/components/ui/ImageUpload';

const EditCoverModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className='px-4 py-2 rounded-xl text-xs font-normal dark:text-white'>Edit Cover →</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Cover Image</DialogTitle>
        </DialogHeader>
        <ImageSelector />
        <ImageUpload />
        <DialogFooter className=''>
          <button 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-md border w-full max-w-sm border-black bg-neutral-100 text-neutral-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,100,0,0.25)] transition duration-200"
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCoverModal;
