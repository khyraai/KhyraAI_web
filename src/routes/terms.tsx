import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Khyra AI Legal Agreement & Usage Policy" },
      {
        name: "description",
        content:
          "Read the Khyra AI Terms of Service governing the use of our website, applications, AI services, and business automation platform.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.khyraai.com/terms" },
    ],
  }),
});
