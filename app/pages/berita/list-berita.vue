<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <!-- Header -->
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">Berita Terbaru</h2>
      <NuxtLink to="/berita/create-berita">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Create
        </button>
      </NuxtLink>
    </div>
    <hr class="bg-secondary-red h-0.5" />

    <div v-if="loading" class="text-center text-gray-500 py-10">
      Memuat berita...
    </div>
    <div v-else-if="error" class="text-center text-red-500 py-10">
      {{ error }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <cardComponent
        v-for="item in paginatedNews"
        :key="item.id"
        :id="item.id!"
        :title="item.title"
        :image="`${apiUrl}/${item.thumbnail}`"
        :to="`/berita/${item.slug}`"
      />
    </div>

    <!-- Pagination -->
    <div
      v-if="!loading && !error && totalPages > 1"
      class="flex justify-center items-center gap-4 mt-10"
    >
      <button
        class="px-3 py-1 bg-secondary-red rounded-md hover:bg-secondary-red/50 text-white disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        ← Prev
      </button>

      <span class="font-medium text-gray-700">
        Halaman {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        class="px-3 py-1 bg-secondary-red rounded-md hover:bg-secondary-red/50 text-white disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="currentPage++"
      >
        Next →
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
const { news, loading, error, FetchAllBerita } = useBerita()

const currentPage = ref(1)
const perPage = 6

const apiUrl = useRuntimeConfig().public.apiBase

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg"
  return path.startsWith("http")
    ? path
    : `${apiUrl}/${path}`
}

const totalPages = computed(() =>
  Math.ceil(news.value.length / perPage)
)

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return news.value.slice(start, start + perPage)
})

onMounted(() => {
  FetchAllBerita()
})
</script>
