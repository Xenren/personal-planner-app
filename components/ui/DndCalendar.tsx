"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Calendar, View, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useCalendarEvents from '@/lib/supabase/useCalendarEvents';
import { getUsername } from '@/lib/supabase/client';
import ConfirmationModal from './ConfirmationModal';


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const DndCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch the user ID when the component mounts
    const getUserID = async () => {
      const id = await getUsername();
      setUserId(id);
    };

    getUserID();
  }, []);

  const { events, addEvent, updateEvent, deleteEvent, loading } = useCalendarEvents(userId);

  const onEventResize = (data: { event: any; start: any; end: any; }) => {
    updateEvent(data);
  };

  const onEventDrop = (data: { event: any; start: any; end: any; }) => {
    updateEvent(data);
  };

  // add a test event
  const handleAddEvent = () => {
    const newEvent = {
      title: "New Event",
      description: "test event creation",
      start: moment().toDate().toISOString(),
      end: moment().add(1, 'hours').toDate().toISOString(),
    };
    addEvent(newEvent);
  };

  // Function to call when an event is clicked
  const handleEventClick = (event: any) => {
    // Set the event to delete and open the modal
    setEventToDelete(event);
    setIsModalOpen(true);
  };

  // Function to call when confirming deletion
  const handleConfirmDelete = async (event: { event_id: string; }| null) => {
    await deleteEvent(event?.event_id ?? null);
    
    setIsModalOpen(false);
    setEventToDelete(null);
  };

  // State to control the current view
  const [currentView, setView] = useState<View>('month');

  // Handle view change
  const onView = useCallback((newView: View) => setView(newView), [setView])

  const {defaultDate} = useMemo(() => ({
    defaultDate: moment().toDate()
  }), [])

  return (
    <div className="h-full">
      <button onClick={handleAddEvent}>Add Event</button> {/* Button to add a test event */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DnDCalendar
          defaultDate={defaultDate}
          defaultView="month"
          events={events.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }))}
          localizer={localizer}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectEvent={handleEventClick}
          resizable
          style={{ height: "100vh" }}
          onView={onView}
          view={currentView}
        />
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventToDelete={eventToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default DndCalendar;