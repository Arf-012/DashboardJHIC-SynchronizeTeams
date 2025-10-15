<template>
  <footer class="w-full border-t-[1px] border-black/20 px-6 md:px-10 py-10 text-gray-700">
    <div
      class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10"
    >
      <div class="md:w-1/3 space-y-4">
        <div class="flex items-center gap-2">
          <img src="/images/Logo.png" alt="Logo" class="w-60 md:w-80" />
        </div>

        <p class="text-sm leading-relaxed">
          SMK Plus Pelita Nusantara menjadi sekolah menengah kejuruan unggulan
          yang menghasilkan sumber daya manusia terampil, entrepreneur, dan religius.
        </p>
      </div>

      <div class="md:w-1/4 space-y-3">
        <h2 class="text-lg md:text-xl font-bold text-black">Navigasi</h2>
        <ul class="space-y-2">
          <li v-for="link in navigasi" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="hover:text-secondary-red transition-all duration-300"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="md:w-1/4 space-y-3">
        <h2 class="text-lg md:text-xl font-bold text-black">Layanan & Kolaborasi</h2>
        <ul class="space-y-2">
          <li v-for="link in layanan" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="hover:text-secondary-red transition-all duration-300"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="max-w-7xl mx-auto mt-10 border-t border-black/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p class="text-sm text-gray-500">
        © {{ new Date().getFullYear() }} SMK Plus Pelita Nusantara. All rights reserved.
      </p>

      <div class="flex items-center gap-5 text-gray-600">
        <NuxtLink to="https://facebook.com" target="_blank" class="hover:text-secondary-red transition">
          <i class="i-simple-icons-facebook w-5 h-5"></i>
        </NuxtLink>
        <NuxtLink to="https://instagram.com" target="_blank" class="hover:text-secondary-red transition">
          <i class="i-simple-icons-instagram w-5 h-5"></i>
        </NuxtLink>
        <NuxtLink to="https://youtube.com" target="_blank" class="hover:text-secondary-red transition">
          <i class="i-simple-icons-youtube w-5 h-5"></i>
        </NuxtLink>
        <NuxtLink to="https://tiktok.com" target="_blank" class="hover:text-secondary-red transition">
          <i class="i-simple-icons-tiktok w-5 h-5"></i>
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navigasi = [
  { label: "Beranda", to: "/" },
  { label: "Profil Sekolah", to: "/profil-sekolah" },
  { label: "Pengumuman dan Berita", to: "/pengumuman" },
  { label: "Tenaga Pendidik", to: "/tenaga-pendidik" },
  { label: "Galeri", to: "/galeri" },
  { label: "Buku Tamu", to: "/buku-tamu" },
];

const layanan = [
  { label: "PPDB Online", to: "/ppdb" },
  { label: "Kerjasama Industri", to: "/kerjasama" },
  { label: "Kunjungan Sekolah", to: "/kunjungan" },
  { label: "Pelatihan & Workshop", to: "/pelatihan" },
  { label: "Hubungi Kami", to: "/kontak" },
];
</script>

<style scoped></style>
