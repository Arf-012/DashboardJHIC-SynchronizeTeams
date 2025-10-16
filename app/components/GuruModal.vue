<template>
  <div
    v-if="guru"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="bg-white w-11/12 md:w-1/2 rounded-2xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
      <button
        class="absolute top-3 right-4 text-gray-400 hover:text-gray-600"
        @click="close"
      >
        ✕
      </button>

      <div class="flex flex-col items-center text-center">
        <img
          :src="getPhotoUrl(guru.photo)"
          class="w-32 h-32 object-cover rounded-full mb-4"
          alt="Foto Guru"
        />
        <h2 class="text-xl font-bold text-gray-800 mb-2">{{ guru.full_name }}</h2>
        <p class="text-sm text-gray-500 mb-1">NIG: {{ guru.nig }}</p>
        <p class="text-sm text-gray-500 mb-3">Mata Pelajaran: {{ guru.subject }}</p>

        <div class="text-left w-full border-t border-gray-200 pt-4">
          <h3 class="font-semibold text-gray-700 mb-2">Deskripsi:</h3>
          <p class="text-gray-600 leading-relaxed whitespace-pre-line">
            {{ guru.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Guru } from '~/types/main.type';


defineProps<{ guru: Guru | null }>()
const emit = defineEmits(['close'])

const close = () => emit('close')

const getPhotoUrl = (path: string) => {
  if (!path) return '/images/default-user.png'
  return path.startsWith('http')
    ? path
    : `https://api-infra.synchronizeteams.my.id/${path}`
}
</script>
