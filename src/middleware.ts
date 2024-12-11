import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { DEFAULT_LNG, LANGUAGES, COOKIE_NAME } from "./locale/constants";

acceptLanguage.languages(LANGUAGES);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|locales).*)",
  ],
};

function resolveLanguage(req: NextRequest): string {
  const isValidLanguage = (lang: string): boolean => LANGUAGES.includes(lang);

  // Check if the language is explicitly defined in the URL
  const langFromUrl = LANGUAGES.find((loc) =>
    req.nextUrl.pathname.startsWith(`/${loc}`)
  );
  if (langFromUrl) return langFromUrl;

  // Check for the language in cookies
  const langFromCookie = req.cookies.get(COOKIE_NAME)?.value;
  if (langFromCookie && isValidLanguage(langFromCookie)) return langFromCookie;

  // Check for the language in the referer URL
  const refererUrl = req.headers.has("referer")
    ? new URL(req.headers.get("referer") || "")
    : null;
  const langFromReferer = refererUrl
    ? LANGUAGES.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    : null;
  if (langFromReferer) return langFromReferer;

  // Check for the language in the Accept-Language header
  const langFromHeader = req.headers.get("Accept-Language");
  if (langFromHeader && isValidLanguage(langFromHeader)) return langFromHeader;

  // Fallback to the default language
  return DEFAULT_LNG;
}

function checkAndUpdateCookie(
  req: NextRequest,
  response: NextResponse,
  lang: string
) {
  if (req.cookies.get(COOKIE_NAME)?.value !== lang)
    response.cookies.set(COOKIE_NAME, lang);
}

export async function middleware(req: NextRequest) {
  const resolvedLanguage = resolveLanguage(req);
  const lang = acceptLanguage.get(resolvedLanguage) ?? DEFAULT_LNG;

  const basePath = process.env.BASE_PATH || "";

  // Redirect if lang in path is not supported
  if (
    !LANGUAGES.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    const response = NextResponse.redirect(
      new URL(
        `${basePath}/${lang}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url
      )
    );
    checkAndUpdateCookie(req, response, lang);
    return response;
  }

  if (req.headers.has("referer")) {
    const response = NextResponse.next();
    checkAndUpdateCookie(req, response, lang);
    return response;
  }

  return NextResponse.next();
}
