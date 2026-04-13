import { NextRequest, NextResponse } from "next/server";
import { localeFromCountry, locales } from "@/lib/i18n";
import { AppLocale } from "@/lib/i18n";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const hasLocale = locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`));
  if (hasLocale) return NextResponse.next();

  const saved = req.cookies.get("site_locale")?.value;
  const country = req.headers.get("x-vercel-ip-country");
  const locale = locales.includes(saved as AppLocale) ? saved : localeFromCountry(country);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
