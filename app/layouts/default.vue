<template>
  <div class="flex min-h-screen">
    <SidebarNavigation />
    <div class="flex-1 flex flex-col">
      <NavbarNavigation />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>