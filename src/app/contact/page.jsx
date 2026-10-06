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
  `${site.name} — ${site.role}`,
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
    <main className="container mx-auto py-16 xl:py-24">
      <JsonLd data={contactGraph()} />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-12 xl:gap-16">
        <div>
          <p className="text-sm uppercase font-semibold mb-4 text-primary tracking-[4px]">Contact</p>
          <h1 className="text-4xl xl:text-5xl font-bold tracking-[-1px] mb-6">Let&apos;s work together.</h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
            Have a project or a question? Send a message with the form, or reach me directly.
          </p>

          <ul className="mt-10 flex flex-col gap-3">
            {details.map(({ label, value, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="glass flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-white/70 dark:hover:bg-white/10"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs uppercase tracking-[2px] text-muted-foreground">{label}</span>
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

        <section aria-labelledby="form-heading" className="glass flex flex-col rounded-xl p-6 sm:p-8">
          <h2 id="form-heading" className="text-xl font-semibold mb-1">Send a message</h2>
          <p className="text-sm text-muted-foreground mb-6">I&apos;ll reply to you by email.</p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
