import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/industry/IndustryPage";

export const Route = createFileRoute("/industries/field-services")({
  component: () => <IndustryPage slug="field-services" />,
});
