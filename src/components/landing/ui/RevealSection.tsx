import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import type { ComponentPropsWithoutRef } from "react";

export function RevealSection({ className, children, ...props }: ComponentPropsWithoutRef<"section">) {
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className={cn(
        "opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
