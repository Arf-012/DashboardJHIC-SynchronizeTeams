<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Galeri Foto</h2>

      <div class="flex flex-wrap justify-center gap-2">
        <select
          v-model="selectedCategory"
          @change="handleCategoryChange"
          class="border rounded-md px-3 py-1"
        >
          <option value="">Semua Kategori</option>
          <option value="galeri">Galeri</option>
          <option value="event">Event</option>
          <option value="dokumentasi">Dokumentasi</option>
        </select>
  
        <NuxtLink to="/galeri/upload-photo">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
          >
            Upload
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-8 animate-pulse">
      Memuat foto...
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <PhotoCard
        v-for="item in paginatedGallery"
        :key="item.ID"
        :image-url="getImageUrl(item.file_path)"
        :title="item.title"
        @delete="openDeleteModal(item.ID)"
      />
    </div>

    <ConfirmModal
      :show="showModal"
      title="Hapus Foto"
      message="Apakah kamu yakin ingin menghapus foto ini?"
      @confirm="confirmDelete"
      @cancel="closeModal"
    />
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
  </div>
</template>

<script setup lang="ts">
const {
  gallery,
  fetchGallery,
  fetchGalleryByCategory,
  deleteGallery,
  loading,
  error,
} = useUseGaleri();
const selectedCategory = ref("");
const showModal = ref(false);
const selectedId = ref<number | null>(null);

const openDeleteModal = (id: number) => {
  selectedId.value = id;
  showModal.value = true;
};

const closeModal = () => {
  selectedId.value = null;
  showModal.value = false;
};

const confirmDelete = async () => {
  if (selectedId.value) {
    await deleteGallery(selectedId.value);
    closeModal();
  }
};

const handleCategoryChange = () => {
  if (selectedCategory.value) {
    fetchGalleryByCategory(selectedCategory.value);
  } else {
    fetchGallery();
  }
};

const apiUrl = useRuntimeConfig().public.apiBase

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg"
  return path.startsWith("http")
    ? path
    : `${apiUrl}/${path}`
}

const currentPage = ref(1)
const perPage = 6

const totalPages = computed(() =>
  Math.ceil(gallery.value.length / perPage)
)

const paginatedGallery = computed(() => {
  const start = (currentPage.value - 1) * perPage
  return gallery.value.slice(start, start + perPage)
})

// Saat mount
onMounted(() => {
  fetchGallery();
});
</script>
