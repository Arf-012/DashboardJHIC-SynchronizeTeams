<template>
  <UDashboardSidebar
    resizable
    collapsible
    :ui="{ footer: 'border-t border-default' }"
    class=""
  >
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto shrink-0" />
      <UIcon
        v-else
        name="i-simple-icons-nuxtdotjs"
        class="size-5 text-primary mx-auto"
      />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
        highlight
        :collapsed="collapsed"
        :items="items[0]"
        orientation="vertical"
        :ui="{
          link: 'flex items-center gap-2 px-3 py-2 rounded-md transition-colors duration-150 text-gray-500 hover:text-primary-white hover:bg-secondary-red/50 focus:bg-secondary-red focus:text-primary-white data-[active=true]:bg-secondary-red data-[active=true]:text-primary-white',
          linkLeadingIcon:
            'size-5 text-gray-400 group-data-[active=true]:text-primary-white group-focus:text-primary-white transition-colors duration-150',
        }"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
        :avatar="{
          src: 'https://github.com/JohnObama24.png',
        }"
        :label="collapsed ? undefined : 'John Obams'"
        color="primary"
        variant="ghost"
        class="w-full"
        :block="collapsed"
      />
    </template>
  </UDashboardSidebar>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items: NavigationMenuItem[][] = [
  [
    {
      label: "Home",
      icon: "i-lucide-house",
      to: "/",
    },
    {
      label: "Berita",
      icon: "i-lucide-newspaper",
      to: "/berita",
    },
    {
      label: "Mading",
      icon: "i-lucide-list",
      to: "/mading",
    },
    {
      label: "Eskul",
      icon: "i-lucide-star",
      to: "/eskul",
    },
  ],
];
</script>

<style scoped></style>
