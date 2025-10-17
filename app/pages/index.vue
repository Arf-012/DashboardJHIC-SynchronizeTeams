<template>
  <div class="flex flex-col gap-12 w-full p-6">
    <!-- Header -->
    <div class="text-center mt-12">
      <h1 class="text-5xl md:text-7xl font-bold text-primary-gray mb-4">
        Selamat Datang
      </h1>
      <p class="text-xl text-gray-500">
        Pilih menu di samping untuk mulai mengelola kontenmu.
      </p>
    </div>

    <!-- Menu Placeholder -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div class="border-2 border-secondary-red rounded-2xl shadow p-8 flex flex-col items-center justify-center hover:shadow-lg transition">
        <UIcon name="i-lucide-newspaper" class="size-6 text-primary-gray mb-3" />
        <h3 class="text-lg font-semibold text-gray-700">Berita</h3>
      </div>
      <div class="border-2 border-secondary-red rounded-2xl shadow p-8 flex flex-col items-center justify-center hover:shadow-lg transition">
        <UIcon name="i-lucide-file-text" class="size-6 text-primary-gray mb-3" />
        <h3 class="text-lg font-semibold text-gray-700">Mading</h3>
      </div>
      <div class="border-2 border-secondary-red rounded-2xl shadow p-8 flex flex-col items-center justify-center hover:shadow-lg transition">
        <UIcon name="i-lucide-award" class="size-6 text-primary-gray mb-3" />
        <h3 class="text-lg font-semibold text-gray-700">Ekstrakurikuler</h3>
      </div>
    </div>

    <!-- Footer Visual / Motivasi -->
    <div class="text-center mt-16">
      <p class="text-lg text-gray-500 max-w-xl mx-auto">
        Gunakan dashboard ini untuk menavigasi dan mengelola konten sekolahmu dengan mudah dan efisien.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

div {
  animation: fadeIn 0.6s ease-in-out;
}
</style>
