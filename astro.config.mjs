import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel";

import criticalCSS from "astro-critical-css";
import rename from "astro-rename";

// https://astro.build/config
export default defineConfig({
  site: "https://puppy.fail",
  integrations: [mdx(), sitemap(), criticalCSS(), rename()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
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
