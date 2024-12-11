"use client";

import { useEffect, useState } from "react";
import { type UseTranslationOptions, useTranslation } from "react-i18next";
import {
  setCookie,
  isBrowser,
  getLangFromCookie,
} from "../../utils/browser";

const useTranslationClient = (
  lang: string,
  ns: string | string[],
  options?: UseTranslationOptions<string>,
  cookieName: string = "portalLang"
) => {
  const langFromCookie = getLangFromCookie(cookieName);
  const [cookieLang, setCookieLang] = useState(langFromCookie);

  const ret = useTranslation(ns, options);
  const { i18n } = ret;
  if (!isBrowser() && lang !== "" && i18n.resolvedLanguage !== lang) {
    i18n.changeLanguage(lang).catch((e) => {
      console.error("Error in chnaging i18n language", e);
    });
    return ret;
  }

  useEffect(() => {
    if (lang === "" || i18n.resolvedLanguage === lang) return;
    i18n.changeLanguage(lang).catch((e) => {
      console.error("Error in chnaging i18n language", e);
    });
  }, [lang, i18n]);

  useEffect(() => {
    if (cookieLang === lang) return;
    setCookie(cookieName, lang, 30);
    setCookieLang(lang);
  }, [lang, cookieLang]);

  return ret;
};

export default useTranslationClient;
