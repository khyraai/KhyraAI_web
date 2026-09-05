import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/industry/IndustryPage";

export const Route = createFileRoute("/industries/it-services")({
  component: () => <IndustryPage slug="it-services" />,
});
