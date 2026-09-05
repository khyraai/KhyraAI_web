import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/industry/IndustryPage";

export const Route = createFileRoute("/industries/real-estate")({
  component: () => <IndustryPage slug="real-estate" />,
});
