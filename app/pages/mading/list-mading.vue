<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Event Terbaru</h2>

      <div class="flex items-center gap-3">
        <select
          v-model="filterVisibility"
          class="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary-red"
        >
          <option value="all">Semua</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <NuxtLink to="/mading/create-mading">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
          >
            Create
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-10">
      Memuat data Event...
    </div>
    <div v-else-if="filteredMading.length === 0" class="text-gray-500 text-center py-10">{{ error }}</div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <EventCard
        v-for="item in paginatedMading"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :image="getImageUrl(item.image)"
        :visibility="item.visibility"
        @delete="handleDelete"
        @change-visibility="handleChangeVisibility"
      />
    </div>

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

definePageMeta({
  path: "/event/list-event",
});

const {
  filteredMading,
  FetchAllMading,
  loading,
  error,
  filterVisibility,
  changeVisibility,
} = UseMading()

const currentPage = ref(1)
const perPage = 6

const totalPages = computed(() =>
  Math.ceil(filteredMading.value.length / perPage)
)

const paginatedMading = computed(() => {
  if (!Array.isArray(filteredMading.value)) return []
  const start = (currentPage.value - 1) * perPage
  return filteredMading.value.slice(start, start + perPage)
})

onMounted(async () => {
  await FetchAllMading()
})

const apiUrl = useRuntimeConfig().public.apiBase

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg"
  return path.startsWith("http") ? path : `${apiUrl}/${path}`
}

// 🧹 Hapus Mading
const handleDelete = async (id: number) => {
  if (confirm("Yakin ingin menghapus mading ini?")) {
    try {
      const { deleteMading } = UseMading()
      await deleteMading(id)
      await FetchAllMading()
    } catch (err) {
      console.error("Gagal menghapus mading:", err)
    }
  }
}

const handleChangeVisibility = async (
  id: number,
  newVisibility: "public" | "private"
) => {
  try {
    await changeVisibility(id, newVisibility)
    await FetchAllMading()
  } catch (err) {
    console.error("Gagal mengubah visibility:", err)
  }
}
</script>
