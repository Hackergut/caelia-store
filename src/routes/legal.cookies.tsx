import { createFileRoute } from "@tanstack/react-router";
import { LegalDocPage } from "@/components/legal-doc";

export const Route = createFileRoute("/legal/cookies")({
  component: () => <LegalDocPage id="cookies" />,
  head: () => ({ meta: [{ title: "Cookie — CAELIA" }] }),
});
