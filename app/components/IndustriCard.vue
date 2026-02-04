<template>
  <div
    class="relative rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg"
  >
    <img
      :src="logo"
      alt="Logo Industri"
      class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <div
      class="absolute bottom-0 left-0 w-full bg-black/60 text-white p-3 flex justify-between items-center"
    >
      <p class="font-semibold truncate">{{ name || "Tanpa Nama" }}</p>
    </div>

    <div
      class="absolute top-2 z-50 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <button
        @click="$emit('edit', id)"
        class="bg-secondary-red text-white p-2 rounded-md hover:bg-secondary-red/50 transition"
        title="Edit"
      >
        <i class="fas fa-edit"></i> Edit
      </button>
      <button
        @click="$emit('delete', id)"
        class="bg-secondary-red text-white p-2 rounded-md hover:bg-secondary-red/50 transition"
        title="Hapus"
      >
        <i class="fas fa-trash-alt"></i> Hapus
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IndustriCardProps {
  id: number;
  name: string;
  logo: string;
  description: string;
  created_at: string;
}

defineProps<IndustriCardProps>();

const emit = defineEmits<{
  edit: [id: number];
  delete: [id: number];
}>();

const apiUrl = useRuntimeConfig().public.apiBase;
</script>
