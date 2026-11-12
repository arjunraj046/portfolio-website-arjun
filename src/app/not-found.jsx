import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Go back to the home page or browse the projects.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="container mx-auto flex min-h-[60vh] flex-col justify-center py-16 xl:py-24">
      <p className="font-mono text-xs sm:text-sm uppercase font-medium mb-4 text-brand tracking-[3px]">404</p>
      <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-[-1px] xl:text-5xl">Page not found</h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
        That address doesn&apos;t exist on this site, or it has moved. The home page and the projects are both still here.
      </p>
      <div className="mt-10 flex w-full max-w-xs flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
        <Button asChild size="cta">
          <Link href="/">
            Go to the home page
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="cta">
          <Link href="/projects">See the projects</Link>
        </Button>
      </div>
    </main>
  );
}
