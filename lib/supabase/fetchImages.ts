import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

async function fetchImages() {
    const bucketName = process.env.NEXT_PUBLIC_IMAGE_BUCKET!;
    let { data: fileList, error } = await supabase.storage
      .from(bucketName)
      .list('', { limit: 100, offset: 0 });
  
    if (error || !fileList) {
      console.error('Error fetching images or fileList is null:', error);
      return [];
    }
  
    const urls = await Promise.all(
      fileList.map(async (file) => {
        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(file.name);
  
        if (!data) {
          console.error('Error getting image URL:', );
          return '';
        }
  
        // Accessing publicUrl from the data object
        return data.publicUrl;
      })
    );
  
    return urls.filter(url => url); // Filter out any empty strings in case of errors
  }

export default fetchImages;