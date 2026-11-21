"use client";

import { useActionState } from "react";
import { login, type FormState } from "@/lib/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(login, null);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink-2">
          Yönetici Şifresi
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="field"
        />
      </div>

      {state?.error ? (
        <p className="rounded-xl bg-clay-2/40 px-4 py-3 text-sm text-ink">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Giriş yapılıyor…" : "Panele Gir"}
      </button>
    </form>
  );
}
