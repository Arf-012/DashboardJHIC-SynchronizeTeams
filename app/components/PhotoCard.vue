<template>
  <div class="relative rounded-lg overflow-hidden shadow-md group">
    <img
      :src="imageUrl"
      alt="Foto Galeri"
      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2">
      <p class="text-sm truncate">{{ title || 'Tanpa Judul' }}</p>
    </div>

    <button
      @click="$emit('delete')"
      class="absolute top-2 right-2 bg-secondary-red hover:bg-secondary-red/50 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
    >
      Hapus
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string
  title: string
}>()

defineEmits(['delete'])
</script>
