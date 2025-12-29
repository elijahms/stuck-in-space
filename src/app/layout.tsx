import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stuck in Space - A Text Adventure Game",
  description: "Can you escape the alien spaceship? A retro text adventure game with a James Bond twist.",
  keywords: ["text adventure", "game", "retro", "space", "aliens", "escape"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
