import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SupportedLocale } from "@prisma/client";

export default async function PromptDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const localeValue = locale as SupportedLocale;
  const prompt = await prisma.prompt.findUnique({
    where: { slug },
    include: { translations: { where: { locale: localeValue }, take: 1 } },
  });

  if (!prompt || !prompt.translations[0]) notFound();

  return (
    <article className="mx-auto max-w-4xl space-y-5">
      <div className="text-sm text-slate-500">
        <Link href={`/${locale}`}>Home</Link> / <Link href={`/${locale}/prompts`}>Prompts</Link>
      </div>
      <h1 className="text-4xl font-semibold">{prompt.translations[0].title}</h1>
      <p className="text-slate-600">{prompt.translations[0].shortDescription}</p>
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <pre className="whitespace-pre-wrap text-sm">{prompt.translations[0].fullPromptText}</pre>
      </section>
      <form action={`/api/prompts/${prompt.id}/copy`} method="post">
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-white">Copy prompt</button>
      </form>
    </article>
  );
}
