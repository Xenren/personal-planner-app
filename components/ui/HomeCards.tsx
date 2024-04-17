import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { CardContainer, CardBody, CardItem } from "@/components/ui/PopOutCard";
import TestBigImage from "@/images/test_bg_img.jpg";
import EditCoverModal from "@/components/ui/EditCoverModal";
import { ImageProvider, useImage } from "@/components/ui/ImageContext";
import { getUsername } from "@/lib/supabase/client";

export default async function HomeCards() {
  // const { selectedImage } = useImage();

  const { userId } = useMemo(
    () => ({
      userId: getUsername(),
    }),
    [],
  );

  const user_id = await userId;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-1">
      <ImageProvider>
        <CardContainer className="inter-var w-auto max-w-96 md:hover:pr-4">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {moment().subtract(1, "months").format("MMMM")}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Seize the day!
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <ImageProvider>
                <Image
                  src={TestBigImage}
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </ImageProvider>
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem translateZ={20}>
                <ImageProvider>
                  <EditCoverModal />
                </ImageProvider>
              </CardItem>
              <CardItem
                translateZ={20}
                as={Link}
                href={`/planner/${user_id}`}
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                View Calendar
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var max-w-96 lg:mx-1 lg:hover:px-1">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {moment().format("MMMM")}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Everday is a chance to be great!
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={TestBigImage}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem translateZ={20}>
                <EditCoverModal />
              </CardItem>
              <CardItem
                translateZ={20}
                as={Link}
                href={`/planner/${user_id}`}
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                View Calendar
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var max-w-96 lg:hover:pl-4">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {moment().add(1, "months").format("MMMM")}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              Face your challenges head on and relish in your achievements!
            </CardItem>
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={TestBigImage}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-between items-center mt-20">
              <CardItem translateZ={20}>
                <EditCoverModal />
              </CardItem>
              <CardItem
                translateZ={20}
                as={Link}
                href={`/planner/${user_id}`}
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
              >
                View Calendar
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </ImageProvider>
    </div>
  );
}
