import { createFileRoute } from "@tanstack/react-router";
import { LegalDocPage } from "@/components/legal-doc";

export const Route = createFileRoute("/legal/privacy")({
  component: () => <LegalDocPage id="privacy" />,
  head: () => ({ meta: [{ title: "Privacy — CAELIA" }] }),
});
