<template>
  <footer
    class="w-full border-t-black border-t-[0.5px] px-4 sm:px-6 lg:px-10 py-6 sm:py-8 lg:py-10"
  >
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-8 lg:items-start text-gray-700"
    >
      <!-- Logo + Deskripsi -->
      <div class="space-y-3 lg:w-1/3">
        <div class="flex items-center gap-2">
          <img src="/images/Logo.png" class="w-52 sm:w-64 lg:w-80" />
        </div>

        <p class="text-sm leading-relaxed">
          SMK Plus Pelita Nusantara Menjadi Sekolah Menengah Kejuruan Unggulan
          yang menghasilkan sumber daya manusia Terampil, Entrepreneur, dan
          Religius.
        </p>
      </div>

      <!-- Navigasi -->
      <div class="space-y-2 lg:w-1/4">
        <h2 class="text-lg sm:text-xl font-bold text-black">Navigasi</h2>
        <ul class="space-y-1">
          <li v-for="(item, i) in routes" :key="i">
            <NuxtLink
              :to="item.to"
              class="hover:text-secondary-red transition-all duration-300"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Layanan dan Kolaborasi -->
      <!-- <div class="space-y-2 lg:w-1/4">
        <h2 class="text-lg sm:text-xl font-bold text-black">
          Layanan dan Kolaborasi
        </h2>
        <ul class="space-y-1">
          <li>
            <NuxtLink
              to="/kerjasama"
              class="hover:text-secondary-red transition-all duration-300"
              >Kerja Sama Industri</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/sertifikat/list-sertifikat"
              class="hover:text-secondary-red transition-all duration-300"
              >Program Sertifikasi</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/forum/list-forum"
              class="hover:text-secondary-red transition-all duration-300"
              >Forum Diskusi</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/tamu/list-pertemuan"
              class="hover:text-secondary-red transition-all duration-300"
              >Kunjungan Industri</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/industri/list-industri"
              class="hover:text-secondary-red transition-all duration-300"
              >Mitra Industri</NuxtLink
            >
          </li>
        </ul>
      </div> -->
    </div>

    <!-- Support Section -->
    <div class="mt-8 pt-6 border-t border-gray-200">
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

    <!-- Copyright -->
    <div class="mt-6 pt-4 border-t border-gray-200">
      <div class="text-center text-sm text-gray-600">
        <p>&copy; {{ currentYear }} SMK Plus Pelita Nusantara. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear())

// Daftar route utama (tanpa ikon)
const routes = [
  { label: "Home", to: "/" },
  { label: "Berita", to: "/berita/list-berita" },
  { label: "Mading", to: "/mading/list-mading" },
  { label: "Guru", to: "/guru/list-guru" },
  { label: "Prestasi", to: "/prestasi/list-prestasi" },
  { label: "Tamu", to: "/tamu/list-pertemuan" },
  { label: "Forum", to: "/forum/list-forum" },

]
</script>
