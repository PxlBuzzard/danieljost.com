import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://danieljost.com",
  output: "static",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Courgette",
      cssVariable: "--font-courgette",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      display: "swap",
    },
  ],
});
