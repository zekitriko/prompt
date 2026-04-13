import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPromptsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prompts = await prisma.prompt.findMany({
    include: { translations: { where: { locale: "en" }, take: 1 } },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Manage prompts</h1>
      {prompts.map((p) => (
        <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-3">
          <Link href={`/${locale}/prompts/${p.slug}`}>{p.translations[0]?.title ?? p.slug}</Link>
        </div>
      ))}
    </div>
  );
}
