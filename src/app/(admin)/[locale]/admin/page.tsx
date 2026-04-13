import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@prisma/client";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role as UserRole | undefined;
  const allowedRoles = new Set<UserRole>([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.EDITOR]);
  if (!session?.user || !role || !allowedRoles.has(role)) {
    return <div className="rounded-xl border border-slate-200 bg-white p-6">Admin access requires sign-in.</div>;
  }

  const [prompts, categories, users] = await Promise.all([
    prisma.prompt.count(),
    prisma.promptCategory.count(),
    prisma.user.count(),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">Prompts: {prompts}</div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">Categories: {categories}</div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">Users: {users}</div>
      </div>
      <Link href="/en/admin/prompts" className="text-sm underline">
        Manage prompts
      </Link>
    </div>
  );
}
