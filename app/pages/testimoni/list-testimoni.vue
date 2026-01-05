<template>
  <div class="p-6 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Testimoni</h2>

      <div class="flex flex-wrap justify-center gap-2">
        <NuxtLink to="/testimoni/create-testimoni">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
          >
            Tambah Testimoni
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-8 animate-pulse">
      Memuat testimoni...
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div
      v-else-if="testimoni.length === 0"
      class="text-gray-500 text-center py-8"
    >
      Tidak ada Testimoni yang ditemukan
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <TestimoniCard
        v-for="item in paginatedTestimoni"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :position="item.position"
        :testimonial="item.testimonial"
        :photo="item.photo ? getImageUrl(item.photo) : ''"
        @edit="openEditModal"
        @delete="openDeleteModal"
      />
    </div>

    <ConfirmModal
      :show="showDeleteModal"
      title="Hapus Testimoni"
      message="Apakah kamu yakin ingin menghapus testimoni ini?"
      @confirm="confirmDelete"
      @cancel="closeModal"
    />

    <!-- Pagination -->
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
const { testimoni, fetchAllTestimoni, deleteTestimoni, loading, error } =
  useTestimoni();

const showDeleteModal = ref(false);
const selectedId = ref<number | null>(null);

const openDeleteModal = (id: number) => {
  selectedId.value = id;
  showDeleteModal.value = true;
};

const openEditModal = (id: number) => {
  navigateTo(`/testimoni/edit/${id}`);
};

const closeModal = () => {
  selectedId.value = null;
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  if (selectedId.value) {
    try {
      await deleteTestimoni(selectedId.value);
      closeModal();
    } catch (err) {
      console.error("Gagal menghapus testimoni:", err);
    }
  }
};

const apiUrl = useRuntimeConfig().public.apiBase;

const getImageUrl = (path?: string) => {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http") ? path : `${apiUrl}/${path}`;
};

const {
  currentPage,
  totalPages,
  paginatedData: paginatedTestimoni,
  nextPage,
  prevPage,
} = usePagination(testimoni, 8);

onMounted(() => {
  fetchAllTestimoni();
});
</script>
