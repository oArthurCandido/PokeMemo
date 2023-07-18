import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html lang="en" className="w-full h-full max-h-screen m-0">
      <body className={inter.className}>
        {children}
        <footer className="relative w-full ">
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
