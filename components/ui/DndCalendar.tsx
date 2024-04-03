"use client";

import React, { useState } from 'react';
import { Calendar, View, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const DndCalendar = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, "days").toDate(),
      title: "Some title",
    },
  ]);

  const onEventResize = ({ event, start, end }:  any) => {
    setEvents((currentEvents) => {
      const idx = currentEvents.indexOf(event);
      const updatedEvent = { ...event, start, end };
      const updatedEvents = [...currentEvents];
      if (idx > -1) {
        updatedEvents[idx] = updatedEvent;
      }
      return updatedEvents;
    });
  };

  const onEventDrop = ({ event, start, end }: any) => {
    setEvents((currentEvents) => {
      const idx = currentEvents.indexOf(event);
      const updatedEvent = { ...event, start, end };
      const updatedEvents = [...currentEvents];
      if (idx > -1) {
        updatedEvents[idx] = updatedEvent;
      }
      return updatedEvents;
    });
  };
  
  // State to control the current view
  const [currentView, setCurrentView] = useState<View>('month');

  // Handle view change
  const handleViewChange = (view: React.SetStateAction<View>) => {
    setCurrentView(view);
  };
  
  return (
    <div className="h-full">
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        view={currentView}
        onView={handleViewChange}
        events={events}
        localizer={localizer}
        onEventDrop={onEventDrop}
        onEventResize={onEventResize}
        resizable
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default DndCalendar;
