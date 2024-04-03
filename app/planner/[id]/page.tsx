import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DndCalendar from "@/components/ui/DndCalendar";
import AuthButton from "@/components/ui/AuthButton";
import Link from "next/link";

export default async function Planner() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if (!user) {
      return redirect("/login");
    }

    // TODO: make header component combining home button with AuthButton
    return (
    <>
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <Link
              href={`/home/${user.id}`}
              className="px-4 py-2 rounded-md border border-black bg-neutral-100 text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
            >
              Home
            </Link>
              <AuthButton />
            </div>
          </nav>
        </div>
        <div>
            <DndCalendar />
        </div>
      </>
  );
}