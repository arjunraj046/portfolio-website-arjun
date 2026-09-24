import { Mail, Phone } from "lucide-react";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";

import ContactForm from "@/components/sections/contact/ContactForm";
import { site, socials } from "@/data/site";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: `Get in touch with ${site.name}, ${site.role}. Send a message, email or call.`,
  openGraph: {
    title: `Contact | ${site.name}`,
    description: `Get in touch with ${site.name}, ${site.role}. Send a message, email or call.`,
  },
};

const profile = (label) => socials.find((social) => social.label === label).href;

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { label: "Phone", value: site.phone, href: site.phoneHref, Icon: Phone },
  { label: "LinkedIn", value: "in/arjun046", href: profile("LinkedIn"), Icon: RiLinkedinFill, external: true },
  { label: "GitHub", value: "arjunraj046", href: profile("GitHub"), Icon: RiGithubFill, external: true },
];

export default function ContactPage() {
  return (
    <main className="container mx-auto py-16 xl:py-24">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-12 xl:gap-16 items-start">
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
                  className="glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-white/70 dark:hover:bg-white/10"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
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
        </div>

        <section aria-labelledby="form-heading" className="glass rounded-2xl p-6 sm:p-8">
          <h2 id="form-heading" className="text-xl font-semibold mb-1">Send a message</h2>
          <p className="text-sm text-muted-foreground mb-6">I&apos;ll reply to you by email.</p>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
