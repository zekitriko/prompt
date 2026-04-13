import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SupportedLocale } from "@prisma/client";

export default async function PromptLibraryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const localeValue = locale as SupportedLocale;
  const q = (await searchParams).q;
  const prompts = await prisma.prompt.findMany({
    where: {
      status: "PUBLISHED",
      translations:
        typeof q === "string"
          ? { some: { locale: localeValue, title: { contains: q, mode: "insensitive" } } }
          : undefined,
    },
    include: { translations: { where: { locale: localeValue }, take: 1 } },
    orderBy: { createdAt: "desc" },
    take: 40,
  });

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-semibold">Prompt Library</h1>
      <form className="rounded-xl border border-slate-200 bg-white p-4">
        <input name="q" placeholder="Search prompts" className="w-full rounded-lg border border-slate-200 px-3 py-2" />
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {prompts.map((p) => (
          <article key={p.id} className="rounded-2xl border border-slate-200 bg-white p-4">
            <Link href={`/${locale}/prompts/${p.slug}`} className="font-semibold">
              {p.translations[0]?.title ?? p.slug}
            </Link>
            <p className="mt-2 text-sm text-slate-600">{p.translations[0]?.shortDescription}</p>
            <form action={`/api/prompts/${p.id}/copy`} method="post" className="mt-3">
              <button className="rounded-lg border border-slate-300 px-3 py-1 text-sm">Copy</button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
