<template>
  <div
    class="relative rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg"
  >
    <!-- Foto Guru -->
    <img
      :src="imageUrl"
      alt="Foto Guru"
      class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <!-- Overlay nama -->
    <div
      class="absolute bottom-0 left-0 w-full bg-black/60 text-white p-3 flex justify-between items-center"
    >
      <p class="font-semibold truncate">{{ title || "Tanpa Nama" }}</p>
    </div>

    <!-- Tombol Edit & Delete (muncul saat hover) -->
    <div
      class="absolute top-2 z-50 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <button
        @click="$emit('edit')"
        class="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition"
        title="Edit"
      >
        <i class="fas fa-edit"></i>
      </button>

      <button
        @click="$emit('delete')"
        class="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
        title="Hapus"
      >
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string;
  title: string;
}>();

defineEmits(["edit", "delete"]);
</script>
