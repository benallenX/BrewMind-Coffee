import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { BrewMindLogo } from "@/components/brewmind-logo";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-2 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
              <Link href="/">
                <BrewMindLogo />
              </Link>
              <div className="flex items-center gap-1 sm:gap-4">
                <Show when="signed-out">
                  <SignInButton>
                    <button className="rounded-full px-2 py-2 text-sm font-medium text-foreground cursor-pointer sm:px-3">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="h-9 cursor-pointer rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 sm:h-10 sm:px-4">
                      Get started
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link href="/dashboard" className="rounded-full px-2 py-2 text-sm font-medium text-foreground sm:px-3">
                    Dashboard
                  </Link>
                  <UserButton />
                </Show>
                <ModeToggle />
              </div>
            </header>
            <main className="flex flex-1 flex-col">{children}</main>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
