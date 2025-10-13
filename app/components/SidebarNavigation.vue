
<template>
  <UDashboardSidebar resizable collapsible :ui="{ footer: 'border-t border-default' }" class="">
    <template #header="{ collapsed }">
      <Logo v-if="!collapsed" class="h-5 w-auto shrink-0" />
      <UIcon v-else name="i-simple-icons-nuxtdotjs" class="size-5 text-primary mx-auto" />
    </template>

    <template #default="{ collapsed }">
      <UNavigationMenu
      :collapsed="collapsed"
      :items="items[0]"
      orientation="vertical"
      />

      <UNavigationMenu
      :collapsed="collapsed"
      :items="items[1]"
      orientation="vertical"
      class="mt-auto"
      />
    </template>

    <template #footer="{ collapsed }">
      <UButton
      :avatar="{
          src: 'https://github.com/JohnObama24.png'
        }"
        :label="collapsed ? undefined : 'John Obams'"
        color="neutral"
        variant="ghost"
        class="w-full"
        :block="collapsed"
        />
    </template>
  </UDashboardSidebar>
</template>
        <script setup lang="ts">
        import type { NavigationMenuItem } from '@nuxt/ui'
        
        const items: NavigationMenuItem[][] = [[{
          label: 'Home',
          icon: 'i-lucide-house',
          active: true
        }, {
          label: 'Berita',
          icon: 'i-lucide-newspaper',
          to: '/berita'
        }, {
          label: 'Mading',
          icon: 'i-lucide-list',
          to: '/mading'
        }, {
          label: 'Eskul',
          icon: 'i-lucide-star',
          to: '/eskul'
        }]]
        </script>

        <style scoped>

</style>

