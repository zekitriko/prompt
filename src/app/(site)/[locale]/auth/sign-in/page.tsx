"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("admin@promptlibrary.dev");
  const [password, setPassword] = useState("Admin123!");

  return (
    <form
      className="mx-auto max-w-md space-y-3 rounded-xl border border-slate-200 bg-white p-6"
      onSubmit={async (e) => {
        e.preventDefault();
        await signIn("credentials", { email, password, callbackUrl: "/en/admin" });
      }}
    >
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-slate-200 px-3 py-2" />
      <button className="w-full rounded-lg bg-slate-900 py-2 text-white">Continue</button>
    </form>
  );
}
