import AuthButton from "@/components/ui/AuthButton";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data && data.user && data.user.id) {
    return redirect(`/home/${data.user.id}`);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <h1>Welcome</h1>
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h1 className="w-full max-w-4xl flex justify-between items-center p-3 text-xl">
            Hello, please create an account to view the demo and show your interest!</h1>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      </footer>
    </div>
  );
}
