import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { howItWorksSteps } from "@/data/landing";

export function HowItWorksSection() {
  const reveal = useScrollReveal();

  return (
    <section
      ref={reveal.ref}
      data-visible={reveal.visible}
      className="bg-beige/40 opacity-0 translate-y-8 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">How it works</div>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">From first call to going live.</h2>
        </div>

        <div className="relative mt-20">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20" />

          <ol className="space-y-20 md:space-y-28">
            {howItWorksSteps.map((step, index) => {
              const left = index % 2 === 0;
              return (
                <li
                  key={step.number}
                  data-visible={reveal.visible}
                  style={{ transitionDelay: `${index * 120}ms` }}
                  className="relative grid grid-cols-2 gap-8 md:gap-16 opacity-0 translate-y-6 transition-all duration-700 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0"
                >
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-6 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-primary ring-8 ring-beige/40"
                  />

                  <div className={left ? "pr-8 text-right md:pr-16" : "col-start-2 pl-8 md:pl-16"}>
                    <div className="font-display text-6xl leading-none text-primary/80 md:text-7xl">{step.number}</div>
                    <h3 className="mt-5 text-lg font-semibold text-ink md:text-xl">{step.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {step.description}
                    </p>
                    <div className="mt-6 h-px w-16 bg-primary/30" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
