"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import useLocale from "src/hooks/use-locale";
import i18next from "i18next";
import {
  AVAILABLE_LANGUAGES,
  NAVBAR,
  NAVBAR_LANGUAGE_OPTIONS,
} from "../locale/constants";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { t } = useLocale(NAVBAR);
  const pathname = usePathname();
  const router = useRouter();

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

  const initialLanguage = pathname.split("/")[1] || AVAILABLE_LANGUAGES.en;
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    i18next.changeLanguage(selectedLang);

    const newPath = `/${selectedLang}${pathname.replace(
      `/${selectedLanguage}`,
      ""
    )}`;
    router.push(newPath);

    setMobileMenuOpen(false);
  };

  useEffect(() => {
    i18next.changeLanguage(initialLanguage);
  }, [initialLanguage]);

  const closeMenu = () => setMobileMenuOpen(false);
  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <aside className="bg-white border-gray-200 z-50 shadow-lg md:px-8 px-1 fixed w-full top-0">
      <div className="flex justify-between items-center py-2 md:py-4 md:px-2 pl-2 mx-auto">
        <div className="flex items-center cursor-pointer">
          <Link
            href="/home"
            className="text-xl font-medium text-decoration-none whitespace-nowrap text-black"
            onClick={closeMenu}
          >
            {t("holderName")}
          </Link>
        </div>

        {/* Mobile Menu Toggle (Hamburger Icon or Close Icon) */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isMobileMenuOpen ? "×" : "☰"}
        </button>

        <div
          className={`hidden md:flex justify-between items-center w-full md:w-auto ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium">
            <div className="block py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300 ease-in-out">
              <select
                id="options"
                name="options"
                className="max-w-40 z-10"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                onClick={(e) => e.stopPropagation()}
              >
                {NAVBAR_LANGUAGE_OPTIONS.map((languageOption) => (
                  <option key={languageOption.id} value={languageOption.id}>
                    {languageOption.label}
                  </option>
                ))}
              </select>
            </div>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="block py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300 ease-in-out"
                  onClick={closeMenu}
                >
                  {name}
                </Link>
              );
            })}
          </div>
          <div>☀️</div>
        </div>
      </div>

      {/* Mobile Menu (for small screens) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-white z-50 ${
          isMobileMenuOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
        onClick={closeMenu}
      >
        <div className="flex flex-col items-center justify-center space-y-4 mt-20">
          <div className="block py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300 ease-in-out">
            <select
              id="options"
              name="options"
              className="block py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300 ease-in-out max-w-40 z-10"
              value={selectedLanguage}
              onChange={handleLanguageChange}
              onClick={(e) => e.stopPropagation()}
            >
              {NAVBAR_LANGUAGE_OPTIONS.map((languageOption) => (
                <option key={languageOption.id} value={languageOption.id}>
                  {languageOption.label}
                </option>
              ))}
            </select>
          </div>
          {Object.entries(navItems).map(([path, { name }]) => {
            return (
              <Link
                key={path}
                href={path}
                className="block py-2 px-3 text-black hover:bg-blue-500 hover:text-white rounded-md transition-all duration-300 ease-in-out"
                onClick={closeMenu}
              >
                {name}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
