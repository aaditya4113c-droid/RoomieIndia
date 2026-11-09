import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RoomieIndia (सहपाठी) - Zero Brokerage Roommates & Flats in India',
  description: 'Find compatible roommates, rooms in shared 2BHK/3BHK flats, and team-up partners across Bengaluru, Mumbai, Gurgaon, Pune, and Hyderabad with zero brokerage.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col font-sans"
      >
        {children}
      </body>
    </html>
  );
}
