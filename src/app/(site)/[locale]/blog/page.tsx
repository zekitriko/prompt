import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SupportedLocale } from "@prisma/client";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const localeValue = locale as SupportedLocale;
  const posts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    include: { translations: { where: { locale: localeValue }, take: 1 } },
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {posts.map((p) => (
        <Link key={p.id} href={`/${locale}/blog/${p.slug}`} className="rounded-xl border border-slate-200 bg-white p-4">
          {p.translations[0]?.title}
        </Link>
      ))}
    </div>
  );
}
