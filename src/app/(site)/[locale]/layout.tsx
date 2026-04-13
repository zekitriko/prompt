import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import { SupportedLocale } from "@prisma/client";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as SupportedLocale)) notFound();

  return (
    <div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link href={`/${locale}`} className="font-semibold">
            Prompt Atlas
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link href={`/${locale}/prompts`}>Prompts</Link>
            <Link href={`/${locale}/blog`}>Blog</Link>
            <Link href={`/${locale}/admin`}>Admin</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
