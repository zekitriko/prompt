import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SupportedLocale } from "@prisma/client";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const localeValue = locale as SupportedLocale;
  const prompts = await prisma.prompt.findMany({
    where: { status: "PUBLISHED" },
    include: { translations: { where: { locale: localeValue }, take: 1 } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 8,
  });

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8">
        <h1 className="text-4xl font-semibold">Premium AI Prompt Library</h1>
        <p className="mt-3 text-slate-600">Multilingual prompt browsing, filtering and copying.</p>
        <Link href={`/${locale}/prompts`} className="mt-5 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-white">
          Browse prompts
        </Link>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Featured and latest prompts</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {prompts.map((p) => (
            <article key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4">
              <Link href={`/${locale}/prompts/${p.slug}`} className="font-semibold">
                {p.translations[0]?.title ?? p.slug}
              </Link>
              <p className="mt-2 text-sm text-slate-600">{p.translations[0]?.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
