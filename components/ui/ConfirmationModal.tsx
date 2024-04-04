import React from 'react';
import Event from '@/lib/supabase/useCalendarEvents'

interface Event {
    event_id: string;
    user_id: string;
    title: string;
    description?: string;
    start: string; // timestamptz
    end: string; // timestamptz
    all_day?: boolean;
  }

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventToDelete: Event | null;
    onConfirmDelete: (event: Event | null) => void;
  }

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, eventToDelete, onConfirmDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete the event "{eventToDelete?.title}"?</p>
        <button onClick={() => onConfirmDelete(eventToDelete)}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;