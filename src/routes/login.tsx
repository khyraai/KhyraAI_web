import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  head: () => ({
    meta: [
      { title: "Sign In to Khyra AI — Your AI Voice Agent Dashboard" },
      {
        name: "description",
        content:
          "Sign in to your Khyra AI account to manage your AI voice agents, monitor call performance, and configure multilingual automations for your business.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.khyraai.com/login" },
    ],
  }),
});
