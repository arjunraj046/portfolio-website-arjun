import LegalPage from "@/components/sections/legal/LegalPage";
import { terms } from "@/data/legal";
import { site } from "@/data/site";

export const metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms and Conditions",
  description: `The terms for using ${site.name}'s portfolio: content ownership, acceptable use, links and the radio.`,
};

export default function TermsPage() {
  return <LegalPage {...terms} />;
}
