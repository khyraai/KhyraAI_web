import { createFileRoute } from "@tanstack/react-router";
import { IndustryPage } from "@/components/industry/IndustryPage";

export const Route = createFileRoute("/industries/hotels-hospitality")({
  component: () => <IndustryPage slug="hotels-hospitality" />,
});
