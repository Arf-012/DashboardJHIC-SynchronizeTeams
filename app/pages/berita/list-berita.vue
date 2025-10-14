<template>
  <section class="p-8">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Berita Terbaru</h2>

    <!-- Grid daftar berita -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <beritaComponent
        v-for="(item, i) in news"
        :key="i"
        :title="item.title"
        :image="item.image"
        :to="`/berita/${item.slug}`"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

const news = [
  {
    title: 'Kegiatan Gotong Royong di Sekolah',
    image: '/images/hai.jpg',
    slug: 'kegiatan-gotong-royong',
  },
  {
    title: 'Lomba 17 Agustus di Sekolah',
    image: '/images/hai.jpg',
    slug: 'lomba-17-agustus',
  },
  {
    title: 'Pentas Seni Akhir Tahun',
    image: '/images/hai.jpg',
    slug: 'pentas-seni-akhir-tahun',
  },
]
</script>
