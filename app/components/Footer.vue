<template>
  <footer
    class="w-full border-t border-secondary-red px-4 sm:px-6 lg:px-10 py-10"
  >
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-700"
    >
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <img src="/images/Logo.png" class="w-52 sm:w-64 lg:w-72" />
        </div>

        <p class="text-sm leading-relaxed text-gray-600">
          SMK Plus Pelita Nusantara menjadi Sekolah Menengah Kejuruan unggulan
          yang menghasilkan sumber daya manusia Terampil, Entrepreneur, dan
          Religius.
        </p>
      </div>

      <div class="space-y-3 flex justify-end">
        <div class="w-full max-w-sm space-y-3">
          <h2 class="text-lg sm:text-xl font-bold text-black">Navigasi</h2>
          <ul
            class="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-2 text-sm text-gray-700"
          >
            <li v-for="(item, i) in navLinks" :key="i">
              <NuxtLink
                :to="item.to"
                class="hover:text-secondary-red transition-all duration-300"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-12 pt-6 border-t border-gray-200">
      <div class="flex flex-col items-center justify-center space-y-6">
        <h3 class="text-lg sm:text-xl font-bold text-gray-700">
          Support and aims to
        </h3>
        <div class="flex justify-center w-full">
          <div
            class="bg-gray-50 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-4xl"
          >
            <img
              src="/images/all-logo.png"
              alt="Support Partners"
              class="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 pt-4 border-t border-gray-200">
      <div class="text-center text-sm text-gray-600">
        <p>
          © {{ currentYear }} SMK Plus Pelita Nusantara. All rights reserved.
          <br />
          Website created by
          <NuxtLink
            class="text-secondary-red hover:underline"
            target="_blank"
            to="https://synchronizeteams.com"
            >SynchronizeTeams</NuxtLink
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear());

const navLinks = [
  { label: "Berita", to: "/berita/list-berita" },
  { label: "Mading", to: "/mading/list-mading" },
  { label: "Event", to: "/event/list-event" },
  { label: "Galeri", to: "/galeri/list" },
  { label: "Guru", to: "/guru/list-guru" },
  { label: "Eskul", to: "/eskul/list" },
  { label: "Prestasi", to: "/prestasi/list-prestasi" },
  { label: "Testimonial", to: "/testimonial/list" },
  { label: "Sertifikasi", to: "/sertifikat/list-sertifikat" },
  { label: "Mitra", to: "/industri/list-industri" },
];
</script>

<style scoped></style>
