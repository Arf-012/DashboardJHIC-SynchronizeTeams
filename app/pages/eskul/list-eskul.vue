<template>
  <section class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Eskul Terbaru</h2>
      <NuxtLink to="/berita/create-berita"><button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md">Create</button></NuxtLink>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <cardComponent
        v-for="(item, i) in eskuls"
        :key="i"
        :title="item.title"
        :image="item.image"
        :to="`/berita/${item.slug}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

const eskuls = [
  {
    title: 'Kegiatan Gotong Royong di Sekolah',
    image: '/images/sapilumba.jpg',
    slug: 'kegiatan-gotong-royong',
  },
  {
    title: 'Lomba 17 Agustus di Sekolah',
    image: '/images/sapilumba.jpg',
    slug: 'lomba-17-agustus',
  },
  {
    title: 'Pentas Seni Akhir Tahun',
    image: '/images/brung.jpg',
    slug: 'pentas-seni-akhir-tahun',
  },
]
</script>
