"use client"

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PostgrestError, } from '@supabase/supabase-js';

const supabase = createClient();

interface Event {
    event_id: string;
    user_id: string;
    title: string;
    description?: string;
    start: string; // timestamptz
    end: string; // timestamptz
    all_day?: boolean;
  }

const useCalendarEvents = (userId: string) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data, error }: { data: Event[] | null; error: PostgrestError | null } = await supabase
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

  const addEvent = async (newEvent: Omit<Event, 'event_id' | 'user_id'>) => {
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

  const updateEvent = async (updatedEventData: any) => {
    const { event: {event_id, description, all_day, title, user_id }, start, end } = updatedEventData;

    
    const updatedEvent: Partial<Event> = {
        event_id: event_id,
        user_id: user_id,
        title: title,
        description: description,
        all_day: all_day ?? false,
        start: start.toISOString(),
        end: end.toISOString()
    };

    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_EVENT_DB!)
      .update(updatedEvent)
      .match({ event_id: event_id });

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