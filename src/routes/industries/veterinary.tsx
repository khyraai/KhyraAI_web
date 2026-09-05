import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/industry/IndustryPage";

export const Route = createFileRoute("/industries/veterinary")({
  component: () => <IndustryPage slug="veterinary" />,
});
