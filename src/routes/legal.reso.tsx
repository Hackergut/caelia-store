import { createFileRoute } from "@tanstack/react-router";
import { LegalDocPage } from "@/components/legal-doc";

export const Route = createFileRoute("/legal/reso")({
  component: () => <LegalDocPage id="reso" />,
  head: () => ({ meta: [{ title: "Resi — CAELIA" }] }),
});
