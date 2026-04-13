import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SupportedLocale } from "@prisma/client";

export default async function BlogDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const localeValue = locale as SupportedLocale;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { translations: { where: { locale: localeValue }, take: 1 } },
  });
  if (!post || !post.translations[0]) notFound();
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="text-3xl font-semibold">{post.translations[0].title}</h1>
      <p className="mt-4">{post.translations[0].content}</p>
    </article>
  );
}
