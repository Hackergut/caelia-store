import { createFileRoute } from "@tanstack/react-router";
import { LegalDocPage } from "@/components/legal-doc";

export const Route = createFileRoute("/legal/spedizione")({
  component: () => <LegalDocPage id="spedizione" />,
  head: () => ({ meta: [{ title: "Spedizioni — CAELIA" }] }),
});
