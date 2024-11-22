import type { Metadata } from "next"
import localFont from "next/font/local"
import { Providers } from "./providers"
// import { Provider } from "./components/ui/provider"
import { Footer } from "./footer"
import "./globals.css"
import { Suspense } from "react"

const pjsNormal = localFont({
  src: "./fonts/PlusJakartaSans-Regular.ttf",
  variable: "--font-PJS-Normal",
  weight: "100 400",
});
const pjsBold = localFont({
  src: "./fonts/PlusJakartaSans-Bold.ttf",
  variable: "--font-PJS-Bold",
  weight: "500 900",
});

export const metadata: Metadata = {
  title: "The Rick and Morty Wiki",
  description: "Created by Adrian Leung",
};

/**
 * RootLayout component
 * 
 * This component serves as the root layout for the application.
 * It includes the Providers component for context providers, a Suspense fallback for lazy-loaded components,
 * and a Footer component.
 * 
 * @param {object} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pjsNormal.variable} ${pjsBold.variable} antialiased`}
      >
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
