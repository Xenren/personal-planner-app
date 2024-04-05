import React, { useState, useEffect } from 'react';
import { CalendarEvent } from '@/lib/supabase/useCalendarEvents';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/Dialog"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit: CalendarEvent | null;
  onConfirmDelete: (event: CalendarEvent) => void;
  onUpdateEvent: (event: CalendarEvent, title: string, description: string) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, eventToEdit, onConfirmDelete, onUpdateEvent }) => {
  const [title, setTitle] = useState(eventToEdit?.title || '');
  const [description, setDescription] = useState(eventToEdit?.description || '');

  useEffect(() => {
    setTitle(eventToEdit?.title || '');
    setDescription(eventToEdit?.description || '');
  }, [eventToEdit]);

  const handleUpdate = () => {
    if (eventToEdit) {
      onUpdateEvent(eventToEdit, title, description);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={isOpen ? onClose : undefined}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update the event details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-title" className="text-right">
              Title
            </Label>
            <Input
              id="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-description" className="text-right">
              Description
            </Label>
            <Textarea
              id="event-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className='flex justify-between'>
          <button 
            onClick={() => eventToEdit && onConfirmDelete(eventToEdit)}
            className="px-4 py-2 rounded-md border border-black bg-red-600 bg-opacity-85 text-neutral-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(100,0,0,0.25)] transition duration-200"
          >
            Delete
          </button>
          <button 
            onClick={handleUpdate}
            className="px-4 py-2 rounded-md border border-black bg-neutral-100 text-neutral-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,100,0,0.25)] transition duration-200"
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
