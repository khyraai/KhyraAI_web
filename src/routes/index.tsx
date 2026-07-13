import { createFileRoute } from "@tanstack/react-router";
import { Index } from "@/components/landing/page";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Khyra AI — AI Voice Agents for Indian Businesses | Answers That Act" },
      {
        name: "description",
        content:
          "Deploy multilingual AI voice agents for your Indian business in hours. Khyra AI handles front desk calls, sales follow-up, and Tier-1 support in Hindi, Kannada, Tamil and 8 more languages.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.khyraai.com/" },
    ],
  }),
});
