import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
const bucketName = process.env.NEXT_PUBLIC_IMAGE_BUCKET!;

async function fetchImages(userId: string) {
  const { data, error } = await supabase.storage.from(bucketName).list(userId, {
    limit: 100,
    offset: 0,
    sortBy: { column: "name", order: "asc" },
  });

  if (error || !data) {
    console.error("Error fetching images or fileList is null:", error);
    return [];
  }

  return data;
}

export default fetchImages;
