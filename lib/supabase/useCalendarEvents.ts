"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PostgrestError, } from '@supabase/supabase-js';
import { stringOrDate } from 'react-big-calendar';

const supabase = createClient();

export interface CalendarEvent {
    event_id: string;
    user_id: string;
    title?: string;
    description?: string;
    start?: string; // timestamptz
    end?: string; // timestamptz
    all_day?: boolean;
  }

export type UpdateCalendarEventParams = {
    event: CalendarEvent;
    start?: stringOrDate; // Including both types to handle direct Date objects and string representations
    end?: stringOrDate;
    title?: string;
    description?: string;
  };

const useCalendarEvents = (userId: string) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error }: { data: CalendarEvent[] | null; error: PostgrestError | null } = await supabase
        .from(process.env.NEXT_PUBLIC_EVENT_DB!)
        .select('*')
        .eq('user_id', userId);

      if (!error && data) {
        setEvents(data);
      } else {
        console.error('Error fetching events:', error?.message);
      }
      setLoading(false);
    };

    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  const addEvent = async (newEvent: Omit<CalendarEvent, 'event_id' | 'user_id'>) => {
    const { data, error } = await supabase
      .from(process.env.NEXT_PUBLIC_EVENT_DB!)
      .insert([newEvent])
      .select()
      .single();

    console.log(data)

    if (!error) {
        console.log("Event Added Successfully")
        setEvents(currentEvents => [...currentEvents, data]);
    } else {
        console.error('Error adding event:', error, error?.message);
    }
  };

  const updateEvent = async (updatedEventData: UpdateCalendarEventParams) => {
    const { event, start, end, title, description } = updatedEventData;

    
    // Prepare the object for the update, including only the fields that are provided.
    const updatedEvent: CalendarEvent = {
      event_id: event.event_id,
      user_id: event.user_id,
      ...(title && { title: title ?? event.title ?? 'Default Title'}), // Use provided title or fall back to the event's current title
      ...(description && { description: description ?? event.description }), // Same for description
      ...(start && { start: new Date(start).toISOString() }), // Convert to ISO string if provided
      ...(end && { end: new Date(end).toISOString() }), // Convert to ISO string if provided
      all_day: event.all_day ?? false, // Default to false if undefined
    };

    console.log(updatedEvent)

    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_EVENT_DB!)
      .update(updatedEvent)
      .match({ event_id: updatedEvent.event_id });

    if (!error) {
        console.log("Event Updated Successfully")
        setEvents(currentEvents => currentEvents.map(e => e.event_id === updatedEvent.event_id ? { ...e, ...updatedEvent } : e));
    } else if (error) {
        console.error('Error updating event:', error, error?.message);
    }
  };

  const deleteEvent = async (eventId: string | null) => {
    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_EVENT_DB!)
      .delete()
      .match({ event_id: eventId });

    if (!error) {
        console.log("Event Deleted Successfully")
      setEvents(currentEvents => currentEvents.filter(event => event.event_id !== eventId));
    } else if (error) {
        console.error('Error deleting event:', error, error?.message);
    }
  };

  return { events, addEvent, updateEvent, deleteEvent, loading };
};

export default useCalendarEvents;