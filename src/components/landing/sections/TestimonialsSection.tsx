import { RevealSection } from "@/components/landing/ui/RevealSection";
import { testimonials } from "@/data/landing";

export function TestimonialsSection() {
  return (
    <RevealSection className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Customers</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">From the front desk.</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7"
          >
            <blockquote className="font-display text-xl leading-snug text-ink">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 text-sm text-muted-foreground">
              <div className="font-medium text-ink">{testimonial.author}</div>
              <div>{testimonial.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </RevealSection>
  );
}
