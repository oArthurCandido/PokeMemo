import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import GoogleAnalytics from "@/lib/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeMemo por Arthur Candido",
  description: "Jogo da memória criado para divertir a exercitar sua mente!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      {process.env.GA_TRACKING_ID && (
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.GA_TRACKING_ID as string}
        />
      )}
      <body className={` ${inter.className}`}>
        {children}
        <footer className="absolute bottom-0 w-full ">
          <button className="absolute flex items-center self-end justify-center p-1 text-xs border rounded-full border-slate-500 bottom-1 right-2">
            <a href="https://arthurcandido.dev" target="_blank">
              Autor
            </a>
          </button>
        </footer>
      </body>
    </html>
  );
}
