<template>
  <div class="p-6 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Sertifikat</h2>

      <div class="flex flex-wrap justify-center gap-2">
        <NuxtLink to="/sertifikat/create-sertifikat">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
          >
            Tambah Sertifikat
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-8 animate-pulse">
      Memuat sertifikat...
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div
      v-else-if="sertifikat.length === 0"
      class="text-gray-500 text-center py-8"
    >
      Tidak ada Sertifikat yang ditemukan
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <SertifikatCard
        v-for="item in paginatedSertifikat"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :image="getImageUrl(item.image)"
        :description="item.description"
        :created_at="item.created_at"
        @edit="openEditModal(item.id)"
        @delete="openDeleteModal(item.id)"
      />
    </div>

    <ConfirmModal
      :show="showDeleteModal"
      title="Hapus Sertifikat"
      message="Apakah kamu yakin ingin menghapus sertifikat ini?"
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
        @click="prevPage"
      >
        ← Prev
      </button>

      <span class="font-medium text-gray-700">
        Halaman {{ currentPage }} / {{ totalPages }}
      </span>

      <button
        class="px-3 py-1 bg-secondary-red rounded-md hover:bg-secondary-red/50 text-white disabled:opacity-50"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { sertifikat, fetchAllSertifikat, deleteSertifikat, loading, error } =
  useSertifikat();

const showDeleteModal = ref(false);
const selectedId = ref<number | null>(null);

const openDeleteModal = (id: number) => {
  selectedId.value = id;
  showDeleteModal.value = true;
};

const openEditModal = (id: number) => {
  navigateTo(`/sertifikat/edit/${id}`);
};

const closeModal = () => {
  selectedId.value = null;
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  if (selectedId.value) {
    try {
      await deleteSertifikat(selectedId.value);
      closeModal();
    } catch (err) {
      console.error("Gagal menghapus sertifikat:", err);
    }
  }
};

const apiUrl = useRuntimeConfig().public.apiBase;

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http") ? path : `${apiUrl}/${path}`;
};

const {
  currentPage,
  totalPages,
  paginatedData: paginatedSertifikat,
  nextPage,
  prevPage,
} = usePagination(sertifikat, 8);

onMounted(() => {
  fetchAllSertifikat();
});
</script>
