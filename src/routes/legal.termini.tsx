import { createFileRoute } from "@tanstack/react-router";
import { LegalDocPage } from "@/components/legal-doc";

export const Route = createFileRoute("/legal/termini")({
  component: () => <LegalDocPage id="termini" />,
  head: () => ({ meta: [{ title: "Termini — CAELIA" }] }),
});
