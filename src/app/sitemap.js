import { site } from "@/data/site";

export default function sitemap() {
  return ["", "/projects", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.8 : 1,
  }));
}
