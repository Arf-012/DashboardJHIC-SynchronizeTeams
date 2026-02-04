// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false, // Enable SPA mode - fixes authentication cookie persistence
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  modules: ["@nuxt/icon", "@nuxt/image", "@nuxt/ui"],
  icon: {
    clientBundle: {
      icons: [
        "lucide:house",
        "lucide:newspaper",
        "lucide:clipboard-list",
        "lucide:star",
        "lucide:image",
        "lucide:graduation-cap",
        "lucide:trophy",
        "lucide:user-plus",
        "lucide:messages-square",
        "lucide:award",
        "lucide:factory",
        "lucide:pin",
        "lucide:message-square-text",
        "lucide:layout-grid",
        "lucide:menu",
        "lucide:shield",
        "heroicons:pencil-square",
        "heroicons:trash",
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://api-penus.smkpluspnb.sch.id",
    },
  },
  nitro: {
    preset: "static",
  },
});
