"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "@/components/ui/PopOutCard";
import TestBigImage from "@/images/test_bg_img.jpg";
import EditCoverModal from "@/components/ui/EditCoverModal";
import { useImage } from "@/components/ui/ImageContext";
import { createClient } from "@/lib/supabase/client";
import { CalendarEvent } from "@/lib/supabase/useCalendarEvents";

interface CoverImage {
  user_id: string;
  image_url: string;
  card_slot: number;
}

const supabase = createClient();

const HomeCards: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [coverImages, setCoverImages] = useState<CoverImage[]>([]);
  const { selectedImage, setSelectedImage } = useImage();
  const [activeCardSlot, setActiveCardSlot] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSaveCoverImage = async (cardSlot: number, imageUrl: string) => {
    // Find the cover image for the slot or create a new one if it doesn't exist
    const existingCover = coverImages.find((img) => img.card_slot === cardSlot);
    const coverToSave: CoverImage = existingCover || {
      user_id: userId,
      image_url: imageUrl,
      card_slot: cardSlot,
    };

    // Update state
    setCoverImages(
      existingCover
        ? coverImages.map((img) =>
            img.card_slot === cardSlot ? { ...img, image_url: imageUrl } : img,
          )
        : [...coverImages, coverToSave],
    );

    // Persist the new cover image to the database
    const { error } = await supabase
      .from(process.env.NEXT_PUBLIC_COVER_IMAGE_DB!)
      .upsert([coverToSave, activeCardSlot]);

    if (error) {
      console.error("Error updating cover image:", error);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      if (!data.user) {
        console.error("User not found");
        return;
      }

      console.log("Active user session:", data.user);
      setUserId(data.user.id);

      const fetchedEvents = await fetchEvents(data.user.id);
      const fetchedCoverImages = await fetchCoverImages(data.user.id);
      if (fetchedEvents && fetchedCoverImages) {
        setEvents(fetchedEvents);
        setCoverImages(fetchedCoverImages);
      }
    };

    getUser();
  }, []);

  // Function to open the modal and set the currently active card
  const handleCoverModal = (cardSlot: number) => {
    setActiveCardSlot(cardSlot);
    setIsModalOpen(true);
    // Clear any previously selected image in the context
    setSelectedImage("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-x-52">
      {events.map((event, index) => (
        <CardContainer
          key={event.event_id}
          className="inter-var w-auto min-w-[22rem] max-w-[22rem] md:hover:px-2"
        >
          <CardBody className="bg-gray-200 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 h-[4rem] dark:text-white"
            >
              {event.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 min-h-[2rem] dark:text-neutral-300"
            >
              {event.description}
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={
                  coverImages.find((img) => img.card_slot === index)
                    ?.image_url ||
                  selectedImage ||
                  TestBigImage
                }
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="Event thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-8">
              <button
                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                onClick={() => handleCoverModal(index)}
              >
                Edit Cover →
              </button>
              {activeCardSlot !== null && (
                <EditCoverModal
                  cardSlot={activeCardSlot}
                  onSave={handleSaveCoverImage}
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                />
              )}
              <CardItem
                translateZ={20}
                as={Link}
                href={`/planner/${event.event_id}`}
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                View Event
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
};

export default HomeCards;

async function fetchEvents(userId: string): Promise<CalendarEvent[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", userId)
    .order("start", { ascending: true })
    .limit(3);

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }
  return data;
}

async function fetchCoverImages(userId: string): Promise<CoverImage[]> {
  const { data, error } = await supabase
    .from("cover_images")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching cover images:", error);
    return [];
  }
  return data;
}
