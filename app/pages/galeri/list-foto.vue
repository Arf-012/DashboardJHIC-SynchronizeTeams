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
        v-for="item in gallery"
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

const getImageUrl = (path: string) => {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http")
    ? path
    : `https://api-infra.synchronizeteams.my.id/${path}`;
};

// Saat mount
onMounted(() => {
  fetchGallery();
});
</script>
