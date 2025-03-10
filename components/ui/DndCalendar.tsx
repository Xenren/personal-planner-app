"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Calendar,
  View,
  momentLocalizer,
  stringOrDate,
} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useCalendarEvents from "@/lib/supabase/useCalendarEvents";
import { getUsername } from "@/lib/supabase/client";
import EventModal from "./EventModal";
import {
  CalendarEvent,
  UpdateCalendarEventParams,
} from "@/lib/supabase/useCalendarEvents";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const DndCalendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Fetch the user ID when the component mounts
    const getUserID = async () => {
      const id = await getUsername();
      setUserId(id);
    };

    getUserID();
  }, []);


  
  const { events, addEvent, updateEvent, deleteEvent, loading } =
    useCalendarEvents(userId || "");

  const onEventResize = (data: {
    event: any;
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    console.log(data.event);
    updateEvent(data);
  };

  const onEventDrop = (data: {
    event: any;
    start: stringOrDate;
    end: stringOrDate;
  }) => {
    console.log(data.event);
    updateEvent(data);
  };

  const handleUpdateEvent = async (
    event: CalendarEvent,
    title: string,
    description: string,
  ) => {
    const updateParams: UpdateCalendarEventParams = {
      event: event,
      title: title,
      description: description,
    };
    console.log(event, title, description);
    await updateEvent(updateParams);
    setEventToEdit(null);
  };

  // add a test event
  const handleAddEvent = () => {
    const newEvent = {
      title: "New Event",
      description: "test event creation",
      start: moment().toDate().toISOString(),
      end: moment().add(1, "hours").toDate().toISOString(),
      all_day: false,
    };
    addEvent(newEvent);
  };

  // Function to call when an event is clicked
  const handleEventClick = (event: any) => {
    setEventToEdit(event);
    console.log(eventToEdit);
    setIsModalOpen(true);
  };

  // Function to call when confirming deletion
  const handleConfirmDelete = async (event: { event_id: string } | null) => {
    console.log(event);
    await deleteEvent(event?.event_id ?? null);

    setIsModalOpen(false);
    setEventToEdit(null);
  };

  // State to control the current view
  const [currentView, setView] = useState<View>("month");

  // Handle view change
  const onView = useCallback((newView: View) => setView(newView), [setView]);


  const [currentDate, setCurrentDate] = useState(moment().toDate());

  const onNavigate = (newDate: Date) => {
    console.log("Navigating to:", newDate);
    setCurrentDate(newDate);
  };

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: moment().toDate(),
    }),

    [],
  );

  return (
    <div className="h-full w-max border-black">
      <button
        className="px-4 py-2 rounded-md border border-black bg-neutral-100 text-neutral-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
        onClick={handleAddEvent}
      >
        Add Event
      </button>{" "}
      {/* Button to add a test event */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DnDCalendar
          date={currentDate} // Ensure this is set
          onNavigate={onNavigate}
          defaultDate={defaultDate}
          defaultView="month"
          events={events.map((event) => ({
            ...event,
            start: new Date(event.start ?? moment().toDate()),
            end: new Date(event.end ?? moment().toDate()),
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
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventToEdit={eventToEdit}
        onConfirmDelete={handleConfirmDelete}
        onUpdateEvent={handleUpdateEvent}
      />
      <div></div>
    </div>
  );
};

export default DndCalendar;
