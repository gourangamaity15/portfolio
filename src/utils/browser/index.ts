export const isBrowser = () => globalThis?.window !== undefined;

export const isMobile = (userAgent: string) =>
  /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );

export const getCookiesData = () => {
  if (globalThis.document === undefined) return {};
  const cookies = globalThis.document.cookie.split('; ');

  const cookieData: Record<string, unknown> = {};

  cookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookieData[name] = decodeURIComponent(value);
  });

  return cookieData;
};

export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number
) => {
  if (globalThis.document === undefined) return;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);

  const cookieValue =
    encodeURIComponent(value) +
    (daysToExpire !== 0 ? `; expires=${expirationDate.toUTCString()}` : '');

  globalThis.document.cookie = `${name}=${cookieValue}; path=/`;
};

export const getLangFromCookie = (cookieName: string) => {
  const lang = getCookiesData()[cookieName];
  return typeof lang === 'string' && lang !== '' ? lang : null;
};

export const detectLang = (
  cookieName: string,
  fallbackLng: string,
  languages: string[]
) => {
  if (!isBrowser()) return fallbackLng;
  const cookieLang = getLangFromCookie(cookieName);
  if (cookieLang !== null) return cookieLang;
  const allLangs = navigator.languages.map((lang) => lang.split('-')[0]);
  const navigatorLang = allLangs.find((lang) => languages.includes(lang));
  if (typeof navigatorLang === 'string' && navigatorLang !== '') {
    return navigatorLang;
  }
  return fallbackLng;
};

export const getCurrentBaseUrl = () => {
  if (!isBrowser()) return '';
  const { hostname, protocol, port = '' } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
};
