import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Khyra AI Data Protection & Your Rights" },
      {
        name: "description",
        content:
          "Review the Khyra AI Privacy Policy for data collection, use, storage, AI processing, and your rights.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.khyraai.com/privacy" },
    ],
  }),
});
