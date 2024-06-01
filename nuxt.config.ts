// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: { public: { baseApiUrl: process.env.API_BASE_URL } },
  devServer: { port: 5173 },
  srcDir: "src/",
  dir: { public: "../public/" },
  serverDir: "server/",
  imports: { dirs: ["stores", "types"] },
  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@nuxtjs/i18n"
  ],
  tailwindcss: {
    cssPath: "~/assets/scss/tailwind.scss",
    configPath: "tailwind.config"
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    classSuffix: "",
    storageKey: "nuxt-color-mode",
    dataValue: "theme"
  },
  i18n: {
    strategy: "no_prefix",
    vueI18n: "./i18n.config.ts",
    locales: [
      { code: "en", name: "English" },
      { code: "vi", name: "Tiếng Việt" }
    ],
    defaultLocale: "vi",
    detectBrowserLanguage: { useCookie: true, cookieKey: "nuxt-app-lang" }
  }
});
