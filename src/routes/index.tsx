import { createFileRoute } from "@tanstack/react-router";
import { Index } from "@/components/landing/page";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Khyra AI — Answers That Act" },
      {
        name: "description",
        content:
          "AI voice agents for Indian businesses — multilingual, always-on, deployable in hours. Hindi, Kannada, Tamil and 8 more languages.",
      },
    ],
  }),
});
