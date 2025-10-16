<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Mading Terbaru</h2>

      <div class="flex items-center gap-3">
        <!-- 🔍 Filter -->
        <select
          v-model="filterVisibility"
          class="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary-red"
        >
          <option value="all">Semua</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <NuxtLink to="/mading/create-mading">
          <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
            Create
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading & Error -->
    <div v-if="loading" class="text-gray-500 text-center py-10">Memuat data mading...</div>
    <div v-else-if="error" class="text-red-500 text-center py-10">{{ error }}</div>

    <!-- Data -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <cardComponent
        v-for="item in paginatedMading"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :image="getImageUrl(item.image)"
        :to="`/mading/${item.id}`"
      >
        <template #footer>
          <span
            class="text-xs font-semibold px-2 py-1 rounded-md"
            :class="item.visibility === 'public'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'"
          >
            {{ item.visibility }}
          </span>
        </template>
      </cardComponent>
    </div>

    <!-- Pagination -->
    <div v-if="!loading && !error && totalPages > 1" class="flex justify-center items-center gap-4 mt-10">
      <button
        class="px-3 py-1 bg-secondary-red rounded-md hover:bg-secondary-red/50 text-white disabled:opacity-50"
        :disabled="currentPage === 1"
        @click="currentPage--"
      >
        ← Prev
      </button>

      <span class="font-medium text-gray-700">Halaman {{ currentPage }} / {{ totalPages }}</span>

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
const { filteredMading, FetchAllMading, loading, error, filterVisibility } = UseMading()

const currentPage = ref(1)
const perPage = 6

const totalPages = computed(() => Math.ceil(filteredMading.value.length / perPage))

const paginatedMading = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return filteredMading.value.slice(start, start + perPage)
})

onMounted(async () => {
  await FetchAllMading()
})

const getImageUrl = (path: string) => {
  if (!path) return '/images/default.jpg'
  return path.startsWith('http')
    ? path
    : `https://api-infra.synchronizeteams.my.id/${path}`
}
</script>
