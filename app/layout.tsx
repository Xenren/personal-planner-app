import { Analytics } from "@vercel/analytics/react"
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Personal Planner",
  description: "Personal Planning and Mental Health for Everyone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-purple-200 to-purple-400">
          {children}
          <Analytics />
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"></footer>
        </main>
      </body>
    </html>
  );
}
