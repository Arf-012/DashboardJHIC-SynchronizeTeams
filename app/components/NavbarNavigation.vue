<template>
  <UHeader
    class="bg-primary-white"
    :title="pageTitle"
    :ui="{
      title: 'text-primary-gray hover:text-secondary-red',
    }"
    :toggle="{
      class: 'bg-secondary-red hover:bg-secondary-red/50 px-4',
    }"
    mode="drawer"
    :menu="{
      class: 'bg-primary-white text-primary-gray',
      ui: {
        body: 'p-4',
      },
    }"
  >
    <template #body>
      <UNavigationMenu
        highlight
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
        :ui="{
          link: 'mt-6 flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 text-primary-gray hover:text-primary-white hover:bg-secondary-red/50 focus:bg-secondary-red focus:text-primary-white data-[active=true]:bg-secondary-red data-[active=true]:text-primary-white',
          linkLeadingIcon:
            'size-5 text-gray-400 group-data-[active=true]:text-primary-white group-focus:text-primary-white transition-colors duration-150',
        }"
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const pageTitle = computed(() => {
  const path = route.path;

  if (path === "/") return "Dashboard > Home";
  if (path.includes("/berita/list-berita")) return "Dashboard > Berita";
  if (path.includes("/event/list-event")) return "Dashboard > Event";
  if (path.includes("/eskul/list-eskul")) return "Dashboard > Ekstrakurikuler";
  if (path.includes("/galeri/list-foto")) return "Dashboard > Galeri";
  if (path.includes("/guru/list-guru")) return "Dashboard > Guru";
  if (path.includes("/prestasi/list-prestasi")) return "Dashboard > Prestasi";
  if (path.includes("/tamu/list-pertemuan")) return "Dashboard > Tamu";
  if (path.includes("/forum/list-forum")) return "Dashboard > Forum";
  if (path.includes("/sertifikat/list-sertifikat"))
    return "Dashboard > Sertifikasi";
  if (path.includes("/industri/list-industri")) return "Dashboard > Industri";
  if (path.includes("/mading/list-mading")) return "Dashboard > Mading";
  if (path.includes("/testimoni/list-testimoni")) return "Dashboard > Testimoni";
  if (path.includes("/portal/list-portal")) return "Dashboard > Portal";

  return "Dashboard";
});

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Berita",
    icon: "i-lucide-newspaper", // Sudah bagus
    to: "/berita/list-berita",
  },
  {
    label: "Event",
    icon: "i-lucide-clipboard-list",
    to: "/event/list-event",
  },
  {
    label: "Eskul",
    icon: "i-lucide-star",
    to: "/eskul/list-eskul",
  },
  {
    label: "Galeri",
    icon: "i-lucide-image",
    to: "/galeri/list-foto",
  },
  {
    label: "Guru",
    icon: "i-lucide-graduation-cap",
    to: "/guru/list-guru",
  },
  {
    label: "Prestasi",
    icon: "i-lucide-trophy",
    to: "/prestasi/list-prestasi",
  },
  {
    label: "Tamu",
    icon: "i-lucide-user-plus",
    to: "/tamu/list-pertemuan",
  },
  {
    label: "Forum",
    icon: "i-lucide-messages-square",
    to: "/forum/list-forum",
  },
  {
    label: "Sertifikasi",
    icon: "i-lucide-award",
    to: "/sertifikat/list-sertifikat",
  },
  {
    label: "Industri",
    icon: "i-lucide-factory",
    to: "/industri/list-industri",
  },
  {
    label: "Mading",
    icon: "i-lucide-pin",
    to: "/mading/list-mading",
  },
  {
    label: "Testimoni",
    icon: "i-lucide-message-square-text",
    to: "/testimoni/list-testimoni",
  },
  {
    label: "Portal",
    icon: "i-lucide-layout-grid",
    to: "/portal/list-portal",
  },
]);
</script>
