import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/book-demo")({
  head: () => ({
    meta: [
      { title: "Book a Free Demo — See Khyra AI Voice Agents in Action" },
      {
        name: "description",
        content:
          "Schedule a personalized demo of Khyra AI's multilingual voice agents. See how we automate front desk, sales follow-up, and Tier-1 support in 11 Indian languages. Response within 24 hours.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.khyraai.com/book-demo" },
    ],
  }),
});
