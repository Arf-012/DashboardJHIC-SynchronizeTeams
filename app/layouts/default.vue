<template>
  <div class="flex min-h-screen bg-primary-white">
    <SidebarNavigation />
    <div class="flex-1 flex flex-col">
      <NavbarNavigation />
      <main class="flex-1 p-6 text-primary-gray">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>