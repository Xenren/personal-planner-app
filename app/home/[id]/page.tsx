import AuthButton from "@/components/ui/AuthButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BentoGrid, BentoGridItem } from "@/components/ui/BentoGrid";
import HomeCards from "@/components/ui/HomeCards";
import { BentoItems } from "@/components/ui/BentoItems";

export default async function HomePage() {
  // const { selectedImage } = useImage();

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-10 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <h1>Continue Your Journey</h1>
            <AuthButton />
          </div>
        </nav>
      </div>

      <div>
        <h1 className="font-bold text-4xl text-center mb-4">
          The Future is Now
        </h1>
      </div>
      <div className="flex-1 flex flex-col gap-10 opacity-100 max-w-4xl px-3 md:mx-16">
        <main className="flex-1 flex flex-col gap-6 ">
          <HomeCards />

          <h2 className="font-bold text-4xl text-center mb-4">
            Your Year at a Glance
          </h2>
          <BentoGrid className="max-w-4xl mx-auto z-50">
            {BentoItems.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                header={item.header}
                icon={item.icon}
                className={i === 3 || i === 6 ? "md:col-span-1" : ""}
              />
            ))}
          </BentoGrid>
        </main>
      </div>
      <footer>
        {/* <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"> */}
      </footer>
    </div>
  );
}
