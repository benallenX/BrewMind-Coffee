import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrewMind Coffee",
  description: "Subscription-first coffee ordering: choose a plan, save a drink, pick a pickup time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider>
          <header className="flex justify-between items-center p-4 h-16 border-b border-black/[.06] dark:border-white/[.08]">
            <Link href="/" className="font-semibold tracking-tight text-brand dark:text-cream-foreground">
              BrewMind
            </Link>
            <div className="flex items-center gap-4">
              <Show when="signed-out">
                <SignInButton>
                  <button className="text-sm font-medium cursor-pointer">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-brand text-brand-foreground rounded-full font-medium text-sm h-10 px-4 cursor-pointer">
                    Get started
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link href="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
                <UserButton />
              </Show>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
