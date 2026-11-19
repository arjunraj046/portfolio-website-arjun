import { site } from "@/data/site";

export default function sitemap() {
  return ["", "/projects", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path ? 0.8 : 1,
  }));
}
