import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-4 text-[2rem] leading-[1.15] sm:text-[2.6rem]">{title}</h2>
      {description ? (
        <p className="mt-4 leading-relaxed text-ink-2">{description}</p>
      ) : null}
    </Reveal>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`container-page py-20 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}
