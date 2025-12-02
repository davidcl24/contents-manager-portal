import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SideBar, {openNav} from "../side-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contents Manager"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SideBar links={["Movies", "Shows", "Actors", "Directors", "Genres"]} />
        <div className="container mt-4 ml-4" onClick={openNav}>
          <div className="sidenav-btn" />
          <div className="sidenav-btn" />
          <div className="sidenav-btn" />
        </div>
        {children}
      </body>
    </html>
  );
}
