<template>
  <div class="text-primary-gray">
    <UDashboardNavbar
      :title=pageTitle
      class=""
      :ui="{
        title: 'text-primary-gray' 
      }"
    />
  </div>
</template>

<script lang="ts" setup>

const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path
  if (path.includes('/')) return 'Dashboard'
  if (path.includes('/berita/list-berita')) return 'Berita'
  if (path.includes('/mading/list-mading')) return 'Mading'
  if (path.includes('/eskul/list-eskul')) return 'ekstra kurikuler'
  return 'Dashboard'
})


</script>

<style>

</style>