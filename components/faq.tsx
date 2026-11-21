"use client";

import { useState } from "react";
import type { Faq } from "@/lib/site";

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10 overflow-hidden rounded-3xl border border-ink/10 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-shell/60 sm:px-7"
            >
              <span className="font-display text-[1.05rem] leading-snug text-ink">{item.q}</span>
              <span
                className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-ink/15 text-sm transition-all duration-300 ${
                  isOpen ? "rotate-45 border-sage bg-sage text-cream" : "text-ink-2"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-400 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[0.95rem] leading-relaxed text-ink-2 sm:px-7">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
