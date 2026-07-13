import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/signup")({
  validateSearch: z.object({
    email: z.string().email().optional().catch(undefined),
    incomplete: z.boolean().optional().catch(undefined),
    redirect: z.string().optional(),
  }),
  head: () => ({
    meta: [
      { title: "Create a Free Khyra AI Account — Get Started Today" },
      {
        name: "description",
        content:
          "Create your Khyra AI account and deploy AI voice agents for your business. Multilingual support across 11 Indian languages — free to get started, no credit card required.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.khyraai.com/signup" },
    ],
  }),
});
