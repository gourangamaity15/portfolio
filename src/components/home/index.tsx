"use client";

import Image from "next/image";
import useLocale from "../../hooks/use-locale";
import { HOME } from "../../locale/constants";
import Link from "next/link";

export default function Home() {
  const { t } = useLocale(HOME);

  const socialLinks = [
    {
      href: "https://leetcode.com/u/gourangamaity15/",
      src: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/40/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-color-tal-revivo.png",
      alt: "Leetcode Profile",
    },
    {
      href: "https://www.geeksforgeeks.org/user/gourangamaity15/",
      src: "https://img.icons8.com/color/40/GeeksforGeeks.png",
      alt: "Geeks for Geeks Profile",
    },
    {
      href: "https://github.com/gourangamaity15",
      src: "https://img.icons8.com/doodle/40/000000/github--v1.png",
      alt: "GitHub",
    },
    {
      href: "https://www.linkedin.com/in/gourangamaity15/",
      src: "https://img.icons8.com/doodle/40/000000/linkedin--v2.png",
      alt: "LinkedIn",
    },
  ];

  return (
    <div
      style={{
        backgroundImage: 'url("/assets/image/hero-image.png")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh", // Covers full viewport height
      }}
    >
      <main
        className="mx-auto max-w-7xl px-4 sm:px-6 md:mt-0 lg:px-8 flex flex-col md:flex-row items-center justify-center md:justify-between h-full"
        id="/"
      >
        <div className="sm:text-center lg:text-left">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block text-black">{t("iAmGouranga")}</span>
            <span className="block text-blue-500 z-0 lg:inline">
              <p className="styles_typicalWrapper__1_Uvh">
                {t("frontEndDeveloper")}
              </p>
            </span>
          </h1>

          <p className="mt-3 text-base text-black sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
           {t('iAmDescription')}
          </p>
          <div className="flex md:justify-start">
      
            {socialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="mr-5 cursor-pointer mt-8 hover:scale-125"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img alt={link.alt} src={link.src} />
              </Link>
            ))}
          </div>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="mt-3 sm:mt-0 cursor-pointer w-1/2">
              <Link
                href="https://drive.google.com/file/d/1pLFW_SfCIquBTi8v9ol8tX-5XK6pmjlK/view?usp=drivesdk"
                target="_blank"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
              >
                {t('resume')}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
