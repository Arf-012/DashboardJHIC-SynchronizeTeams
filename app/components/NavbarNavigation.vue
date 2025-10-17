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
        // wrapper: 'bg-primary-white', 
      }
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

  if (path.includes("/berita/list-berita")) return "Dashboard > Berita";
  if (path.includes("/mading/list-mading")) return "Dashboard > Mading";
  if (path.includes("/eskul/list-eskul")) return "Dashboard > Ekstrakurikuler";
  if (path.includes("/galeri/list-foto")) return "Dashboard > Galeri";
  if (path.includes("/guru/list-guru")) return "Dashboard > Guru";

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
      icon: "i-lucide-newspaper",
      to: "/berita/list-berita",
    },
    {
      label: "Mading",
      icon: "i-lucide-list",
      to: "/mading/list-mading",
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
      icon: "i-lucide-image",
      to: "/guru/list-guru",
    },
]);
</script>