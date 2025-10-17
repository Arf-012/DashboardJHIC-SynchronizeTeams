<template>
  <div
    class="relative rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg"
  >
    <!-- Logo Sertifikat -->
    <img
      :src="image"
      alt="Logo Sertifikat"
      class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <!-- Overlay nama -->
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
interface SertifikatCardProps {
  id: number;
  name: string;
  image?: string
  description?: string;
  created_at?: string;
}

defineProps<SertifikatCardProps>();

const emit = defineEmits<{
  edit: [id: number];
  delete: [id: number];
}>();

const apiUrl = useRuntimeConfig().public.apiBase;

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default-certificate.jpg";
  return path.startsWith("http") ? path : `${apiUrl}/${path}`;
};
</script>