<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Industri</h2>

      <div class="flex flex-wrap justify-center gap-2">
        <NuxtLink to="/industri/create-industri">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
          >
            Tambah Industri
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-8 animate-pulse">
      Memuat sertifikat...
    </div>

    <div v-else-if="IndustriList.length === 0" class="text-gray-500 text-center py-8">
      Tidak ada Industri yang ditemukan
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <IndustriCard
        v-for="item in paginatedIndustri"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :logo="getImageUrl(item.logo)"
        :description="item.description"
        :created_at="item.created_at"
        @edit="openEditModal(item.id)"
        @delete="openDeleteModal(item.id)"
      />
    </div>

    <ConfirmModal
      :show="showDeleteModal"
      title="Hapus Industri"
      message="Apakah kamu yakin ingin menghapus Industri ini?"
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
  fetchAllIndustri,
  loading,
  error,
  IndustriList,
  deleteIndustri
} = UseIndustri()

const showDeleteModal = ref(false);
const selectedId = ref<number | null>(null);

const openDeleteModal = (id: number) => {
  selectedId.value = id;
  showDeleteModal.value = true;
};

const openEditModal = (id: number) => {
  navigateTo(`/industri/edit/${id}`);
};

const closeModal = () => {
  selectedId.value = null;
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  if (selectedId.value) {
    try {
      await deleteIndustri(selectedId.value)
      closeModal();
    } catch (err) {
      console.error("Gagal menghapus sertifikat:", err);
    }
  }
};

const apiUrl = useRuntimeConfig().public.apiBase

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg"
  return path.startsWith("http")
    ? path
    : `${apiUrl}/${path}`
}

const currentPage = ref(1);
const perPage = 8;

const totalPages = computed(() =>
  Math.ceil(IndustriList.value.length / perPage)
);

const paginatedIndustri = computed(() => {
  if (!Array.isArray(IndustriList.value)) return [];
  const start = (currentPage.value - 1) * perPage;
  return IndustriList.value.slice(start, start + perPage);
});

onMounted(() => {
  fetchAllIndustri();
});
</script>