import { Check, Minus } from "lucide-react";
import { RevealSection } from "@/components/landing/ui/RevealSection";
import { comparisonColumns, comparisonRows } from "@/data/landing";

export function CompareSection() {
  return (
    <RevealSection id="compare" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Comparison</div>
        <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
          Why teams choose <span className="italic text-primary">Khyra</span>.
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-beige/40">
                <th className="px-6 py-4 font-medium text-muted-foreground">Feature</th>
                {comparisonColumns.map((column, index) => (
                  <th
                    key={column}
                    className={`px-6 py-4 font-medium ${index === 0 ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, rowIndex) => (
                <tr key={row.feature} className={rowIndex % 2 === 0 ? "bg-background" : "bg-secondary/40"}>
                  <td className="px-6 py-4 text-ink">{row.feature}</td>
                  {row.values.map((value, valueIndex) => (
                    <td key={valueIndex} className={`px-6 py-4 ${valueIndex === 0 ? "bg-beige/30" : ""}`}>
                      {value === true ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : value === false ? (
                        <Minus className="h-4 w-4 text-muted-foreground/50" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{value}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </RevealSection>
  );
}
