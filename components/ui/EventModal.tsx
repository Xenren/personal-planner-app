import React, { useState } from 'react';
import { CalendarEvent } from '@/lib/supabase/useCalendarEvents';

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

  // Reset form when eventToEdit changes
  React.useEffect(() => {
    setTitle(eventToEdit?.title || '');
    setDescription(eventToEdit?.description || '');
  }, [eventToEdit]);

  if (!isOpen) return null;

  const handleUpdate = (eventToEdit: CalendarEvent | null, title: string, description: string) => {
    if (eventToEdit) {
      onUpdateEvent(eventToEdit, title, description);
      onClose(); 
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Event</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button onClick={() => [eventToEdit, title, description] && handleUpdate(eventToEdit, title, description)}>Update</button>
        <button onClick={() => eventToEdit && onConfirmDelete(eventToEdit)}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EventModal;
