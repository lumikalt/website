import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeSpanKorean from "./src/utils/rehype-span-korean";
import rehypeBetterTooltips from "./src/utils/rehype-better-tooltips";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://puppy.fail",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeBetterTooltips]
  },
  adapters: [
    vercel({
      imageService: true,
      isr: {
        expiration: 60 * 60 * 24
      },
      webAnalytics: {
        enabled: true
      }
    })
  ]
});
