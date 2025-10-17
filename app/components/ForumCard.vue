<template>
  <div
    class="w-full bg-white border border-secondary-red rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-stretch"
  >
    <div class="sm:w-48 w-full h-48 sm:h-auto relative bg-gray-100 flex-shrink-0">
      <img
        v-if="icon"
        :src="icon"
        alt="Forum Icon"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div
        v-else
        class="flex items-center justify-center h-full text-gray-400 text-sm"
      >
        Tidak ada gambar
      </div>
    </div>

    <div class="flex flex-col justify-between flex-1 p-5">
      <div>
        <h3 class="text-xl font-semibold text-gray-800 line-clamp-1">
          {{ name }}
        </h3>
        <p class="text-sm text-gray-500 mt-1 line-clamp-2">
          {{ description || "Belum ada deskripsi." }}
        </p>
      </div>

      <div class="mt-4 flex justify-between items-center">
        <span
          class="text-sm font-medium"
          :class="isActive ? 'text-green-600' : 'text-red-500'"
        >
          {{ isActive ? "Aktif" : "Nonaktif" }}
        </span>

        <div class="flex gap-2">
          <button
            @click="$emit('edit', id)"
            class="px-3 py-1 text-xs bg-secondary-red hover:bg-secondary-red/50 text-white rounded-md transition"
          >
            Edit
          </button>
          <button
            @click="$emit('delete', id)"
            class="px-3 py-1 text-xs bg-secondary-red hover:bg-secondary-red/50 text-white rounded-md transition"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number
  name: string
  description: string | null
  icon?: string | null
  isActive: boolean
}>()

defineEmits(["edit", "delete"])
</script>
