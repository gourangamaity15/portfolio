"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useLocale from "src/hooks/use-locale";
import i18next from "i18next";
import { AVAILABLE_LANGUAGES, NAVBAR, NAVBAR_LANGUAGE_OPTIONS } from "../locale/constants";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'


export function Navbar() {
  const { t } = useLocale(NAVBAR);
  const pathname = usePathname();
  const router = useRouter()

  const navItems = {
    "/home": {
      name: t("home"),
    },
    "/about": {
      name: t("about"),
    },
    "/services": {
      name: t("services"),
    },
    "/projects": {
      name: t("projects"),
    },
    "/contact": {
      name: t("contact"),
    },
  };

  const initialLanguage = pathname.split('/')[1] || AVAILABLE_LANGUAGES.en;

  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang); 
    i18next.changeLanguage(selectedLang);

    const newPath = `/${selectedLang}${pathname.replace(`/${selectedLanguage}`, '')}`;
    router.push(newPath);
  };

  useEffect(() => {
    i18next.changeLanguage(initialLanguage);
  }, [initialLanguage]);

  return (
    <aside className="bg-white border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0">
      <div className="flex justify-between items-center py-2 md:py-4 md:px-2 pl-2 mx-auto">
        <div className="flex items-center cursor-pointer">
          <Link
            href={`/${selectedLanguage}/home`}
            className="text-xl font-medium text-decoration-none whitespace-nowrap text-black"
          >
            {t("holderName")}
          </Link>
        </div>
        <div className="hidden justify-between items-center w-full md:flex md:w-auto">
          <div className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium">
            <select
              id="options"
              name="options"
              className="max-w-40"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {NAVBAR_LANGUAGE_OPTIONS.map((languageOption) => (
                <option key={languageOption.id} value={languageOption.id}>
                  {languageOption.label}
                </option>
              ))}
            </select>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={`/${selectedLanguage}${path}`}
                  className="block py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md"
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div>☀️</div>
        </div>
      </div>
    </aside>
  );
}
