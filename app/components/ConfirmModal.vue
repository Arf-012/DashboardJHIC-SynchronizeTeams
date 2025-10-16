<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-lg w-80 p-6 text-center space-y-4 animate-fade-in"
    >
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <p class="text-gray-600 text-sm">{{ message }}</p>

      <div class="flex justify-center gap-4 mt-6">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
        >
          Batal
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 rounded-md bg-secondary-red hover:bg-secondary-red/50 text-white  transition"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title?: string
  message?: string
}>()

defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
