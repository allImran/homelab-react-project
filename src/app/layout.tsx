import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Orbit · Your news, in orbit", template: "%s · Orbit" },
  description: "Browse free RSS feeds from around the world and save the stories that matter to your own dashboard.",
};

export const viewport: Viewport = { themeColor: "#040405" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <SmoothScroll>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
