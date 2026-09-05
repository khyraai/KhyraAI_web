import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/industry/IndustryPage";

export const Route = createFileRoute("/industries/cosmetic-clinics")({
  component: () => <IndustryPage slug="cosmetic-clinics" />,
});
