import ContactForm from "@/components/sections/contact/ContactForm";
import CopyDetails from "@/components/sections/contact/CopyDetails";
import ContactList from "@/components/sections/contact/ContactList";
import { site, contactChannels, profileUrl } from "@/data/site";
import { JsonLd, contactGraph } from "@/lib/structuredData";

export const metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact",
  description: `Contact ${site.name}, ${site.role}, about a role, a project or a question: message form, email, phone or WhatsApp.`,
  openGraph: {
    title: `Contact | ${site.name}`,
    description: `Contact ${site.name}, ${site.role}, about a role, a project or a question: message form, email, phone or WhatsApp.`,
  },
};

const detailsText = [
  `${site.name}, ${site.role}`,
  site.description,
  "",
  `Email: ${site.email}`,
  `Phone: ${site.phone}`,
  `WhatsApp: ${site.whatsappHref.split("?")[0]}`,
  `LinkedIn: ${profileUrl("LinkedIn").replace(/\/$/, "")}`,
  `GitHub: ${profileUrl("GitHub")}`,
  `Portfolio: ${site.url}`,
].join("\n");

export default function ContactPage() {
  return (
    <main id="main" className="container mx-auto py-16 xl:py-24">
      <JsonLd data={contactGraph()} />
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-12 xl:gap-16">
        <div>
          <p className="font-mono text-xs sm:text-sm uppercase font-medium mb-4 text-brand tracking-[3px]">Contact</p>
          <h1 className="mb-6 text-balance text-5xl font-semibold leading-[1.05] tracking-[-1.5px] xl:text-6xl">I&apos;d be glad to hear from you</h1>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-md">
            Whether it&apos;s about a role, a project, some advice, or you simply want to reconnect, every message is welcome. Use the form, or reach me on whichever channel suits you best.
          </p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Based in {site.location} <span aria-hidden="true">·</span> {site.workSetup}
          </p>

          <ContactList channels={contactChannels} className="mt-10" />

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
