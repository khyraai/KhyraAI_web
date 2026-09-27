import { createFileRoute } from "@tanstack/react-router";
import { Index } from "@/components/landing/page";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Khyra AI — Operational AI System for Conversation-Driven Workflows" },
      {
        name: "description",
        content:
          "Khyra is an operational AI system that handles real business conversations and executes the backend workflows behind them. Turn customer conversations into completed business actions.",
      },
      { property: "og:title", content: "Khyra AI — Operational AI Platform" },
      {
        property: "og:description",
        content:
          "Operational AI for conversation-driven workflows. Communicates, reasons within defined business rules, and executes work directly inside your existing systems.",
      },
    ],
  }),
});
