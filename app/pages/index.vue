<template>
  <div class="flex flex-col gap-8 w-full p-6">
    <div class="text-center">
      <h2 class="text-5xl md:text-7xl font-bold text-primary-gray mb-2">
        Selamat Datang
      </h2>
      <p class="text-xl text-gray-500">
        Pilih menu di samping untuk mulai mengelola kontenmu.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div
        class="border-2 border-secondary-red rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
      >
        <div class="text-4xl mb-2">
          <UIcon
            name="i-lucide-newspaper"
            class="size-5 text-primary-gray mx-auto"
          />
        </div>
        <h3 class="text-lg font-semibold text-gray-700">Total Berita</h3>
        <p class="text-3xl font-bold text-secondary-red mt-1">12</p>
      </div>

      <div
        class="border-2 border-secondary-red rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
      >
        <div class="text-4xl mb-2">
          <UIcon
            name="i-lucide-newspaper"
            class="size-5 text-primary-gray mx-auto"
          />
        </div>
        <h3 class="text-lg font-semibold text-gray-700">Total Mading</h3>
        <p class="text-3xl font-bold text-secondary-red mt-1">8</p>
      </div>

      <div
        class="border-2 border-secondary-red rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
      >
        <div class="text-4xl mb-2">
          <UIcon
            name="i-lucide-newspaper"
            class="size-5 text-primary-gray mx-auto"
          />
        </div>
        <h3 class="text-lg font-semibold text-gray-700">Ekstrakurikuler</h3>
        <p class="text-3xl font-bold text-secondary-red mt-1">5</p>
      </div>
    </div>

    <div class="border-2 border-secondary-red rounded-2xl shadow p-6 mt-4">
      <h3 class="text-2xl font-semibold text-primary-gray mb-4">
        Aktivitas Terbaru
      </h3>
      <ul class="divide-y divide-secondary-red">
        <li class="py-3 flex justify-between items-center">
          <span class="text-primary-gray">
            <UIcon
              name="i-lucide-newspaper"
              class="size-5 text-primary-gray mx-auto"
            />
            Berita baru ditambahkan: “Kegiatan Literasi Sekolah”</span
          >
          <span class="text-sm text-gray-500">2 jam lalu</span>
        </li>
        <li class="py-3 flex justify-between items-center">
          <span class="text-gray-700">
            <UIcon
              name="i-lucide-newspaper"
              class="size-5 text-primary-gray mx-auto"
            />
            Mading “Karya Siswa Bulan Ini” diperbarui</span
          >
          <span class="text-sm text-gray-500">5 jam lalu</span>
        </li>
        <li class="py-3 flex justify-between items-center">
          <span class="text-gray-700">
            <UIcon
              name="i-lucide-newspaper"
              class="size-5 text-primary-gray mx-auto"
            />
            Ekstrakurikuler baru: Futsal</span
          >
          <span class="text-sm text-gray-500">Kemarin</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
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
