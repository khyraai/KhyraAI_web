import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, description, id }: SectionHeadingProps) {
  return (
    <div id={id} className="mb-12 max-w-2xl">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</div>
      <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
