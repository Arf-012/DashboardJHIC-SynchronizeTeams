<template>
  <div
    class="border-2 border-secondary-red rounded-xl shadow-md p-4 hover:shadow-lg cursor-pointer transition relative"
    @click="$emit('show-detail', guru)"
  >
    <img
      :src="getPhotoUrl(guru.photo)"
      alt="Foto Guru"
      class="w-full h-48 object-cover rounded-lg mb-3"
    />
    <h3 class="text-lg font-semibold text-gray-800">{{ guru.full_name }}</h3>
    <p class="text-sm text-gray-600">{{ guru.subject }}</p>
    
      <div class="flex gap-4 mt-2">
        <NuxtLink :to="`/guru/edit/${guru.id}`">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
          >
            Edit
          </button>
        </NuxtLink>

        <button
          @click="$emit('delete')"
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Delete
        </button>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { Guru } from "~/types/main.type";

defineProps<{ guru: Guru }>();

const getPhotoUrl = (path: string) => {
  if (!path) return "/images/default-user.png";
  return path.startsWith("http")
    ? path
    : `https://api-infra.synchronizeteams.my.id/${path}`;
};

defineEmits(["show-detail", "delete"]);
</script>
