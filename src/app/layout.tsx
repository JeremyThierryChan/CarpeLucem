import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Carpe Lucem",
    template: "%s | Carpe Lucem",
  },
  description:
    "The Art of the Finest Living — Premium ingredients, fine spirits, luxury experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={notoSansArabic.variable}>
      <body>{children}</body>
    </html>
  );
}
