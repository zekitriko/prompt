export const locales = ["az", "ru", "tr", "en"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "en";

const map: Record<string, AppLocale> = {
  AZ: "az",
  TR: "tr",
  RU: "ru",
  BY: "ru",
  KZ: "ru",
};

export function localeFromCountry(country?: string | null): AppLocale {
  if (!country) return defaultLocale;
  return map[country.toUpperCase()] ?? defaultLocale;
}
