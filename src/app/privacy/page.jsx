import LegalPage from "@/components/sections/legal/LegalPage";
import { privacy } from "@/data/legal";
import { site } from "@/data/site";

export const metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description: `How ${site.name}'s portfolio handles your information: what the contact form collects, what's saved on your device and which services your browser connects to.`,
};

export default function PrivacyPage() {
  return <LegalPage {...privacy} />;
}
