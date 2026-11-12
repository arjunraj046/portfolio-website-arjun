import { Mail, Phone } from "lucide-react";
import { RiGithubFill, RiLinkedinFill, RiWhatsappFill } from "react-icons/ri";

import ContactForm from "@/components/sections/contact/ContactForm";
import CopyDetails from "@/components/sections/contact/CopyDetails";
import { site, socials } from "@/data/site";
import { JsonLd, contactGraph } from "@/lib/structuredData";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.role}. Send a message, email, call or WhatsApp.`,
  openGraph: {
    title: `Contact | ${site.name}`,
    description: `Get in touch with ${site.name}, ${site.role}. Send a message, email, call or WhatsApp.`,
  },
};

const profile = (label) => socials.find((social) => social.label === label).href;

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "Phone", value: site.phone, href: site.phoneHref, Icon: Phone },
  { label: "WhatsApp", value: "Chat with me on WhatsApp", href: site.whatsappHref, Icon: RiWhatsappFill, external: true },
  { label: "LinkedIn", value: "in/arjun046", href: profile("LinkedIn"), Icon: RiLinkedinFill, external: true },
  { label: "GitHub", value: "arjunraj046", href: profile("GitHub"), Icon: RiGithubFill, external: true },
];

const detailsText = [
  `${site.name}, ${site.role}`,
  site.description,
  "",
  `Email: ${site.email}`,
  `Phone: ${site.phone}`,
  `WhatsApp: ${site.whatsappHref.split("?")[0]}`,
  `LinkedIn: ${profile("LinkedIn").replace(/\/$/, "")}`,
  `GitHub: ${profile("GitHub")}`,
  `Portfolio: ${site.url}`,
].join("\n");

export default function ContactPage() {
  return (
    <main id="main" className="container mx-auto py-16 xl:py-24">
      <JsonLd data={contactGraph()} />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-12 xl:gap-16">
        <div>
          <p className="font-mono text-xs sm:text-sm uppercase font-medium mb-4 text-brand tracking-[3px]">Contact</p>
          <h1 className="text-4xl xl:text-5xl font-semibold tracking-[-1px] mb-6">Get in touch</h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
            I&apos;m open to full-time full-stack and backend roles. Send a message with the form, or reach me directly.
          </p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Based in {site.location} <span aria-hidden="true">·</span> {site.workSetup}
          </p>

          <ul className="mt-10 border-b border-border">
            {details.map(({ label, value, href, Icon, external }) => (
              <li key={label} className="border-t border-border">
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="group flex items-center gap-4 py-4 transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
                >
                  <Icon size={18} aria-hidden="true" className="shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <span className="font-mono text-xs uppercase tracking-[2px] text-muted-foreground">{label}</span>
                    <span className="font-medium break-all">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <CopyDetails text={detailsText} />
          </div>
        </div>

        <section aria-labelledby="form-heading" className="flex flex-col border-t border-border pt-8 xl:border-l xl:border-t-0 xl:pl-12 xl:pt-0">
          <h2 id="form-heading" className="text-xl font-semibold mb-1">Send a message</h2>
          <p className="text-sm text-muted-foreground mb-6">I&apos;ll reply to you by email.</p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
