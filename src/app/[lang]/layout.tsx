import "./global.css";
import type { Metadata } from "next";
import { Navbar } from "./../../components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./../../components/footer";
import { dir } from "i18next";
import LocaleClient from "src/locale/localeClient";
import { GlobalContextProvider } from "src/context/global-context";
import { isMobile } from "src/utils/browser";
import { headers } from "next/headers";

export const metadata: Metadata = {
  // metadataBase: new URL(baseUrl),
  title: {
    default: "Gouranga Maity",
    template: "%s | Next.js Portfolio Starter",
  },
  description: "This is Gouranga maity portfolio website",
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  params: { lang },
  children,
}: {
  params: { lang: string };
  children: React.ReactNode;
}) {
  const headersList = headers();

  const isMobileLayout = isMobile(headersList.get("user-agent") ?? "");

  const providerInitialValue = {
    screen: {
      isMobile: isMobileLayout,
    },
    locale: {
      lang,
    },
  };


  return (
    <html lang={lang} dir={dir(lang)} key={lang}>
      <body className="">
        {/* <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0"> */}
        <LocaleClient />

        <GlobalContextProvider initialValue={providerInitialValue}>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />{" "}
        </GlobalContextProvider>
        {/* </main> */}
      </body>
    </html>
  );
}
