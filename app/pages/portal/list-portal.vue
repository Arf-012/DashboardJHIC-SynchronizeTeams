<template>
  <div class="p-6 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Portal</h2>

      <div class="flex flex-wrap justify-center gap-2">
        <NuxtLink to="/portal/create-portal">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
          >
            Tambah Portal
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-gray-500 text-center py-8 animate-pulse">
      Memuat portal...
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div
      v-else
      class="flex flex-col gap-6"
    >
      <PortalCard
        v-for="item in paginatedPortal"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :description="item.description"
        :logo="getLogoUrl(item.logo)"
        :url="item.url"
        :category="item.category"
        :isActive="item.is_active"
        @edit="openEditModal(item.id)"
        @delete="openDeleteModal(item.id)"
      />
    </div>

    <ConfirmModal
      :show="showDeleteModal"
      title="Hapus Portal"
      message="Apakah kamu yakin ingin menghapus portal ini?"
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

const { portal, fetchAllPortal, deletePortal, loading, error } = UsePortal()

const showDeleteModal = ref(false);
const selectedId = ref<number | null>(null);

const openDeleteModal = (id: number) => {
  selectedId.value = id;
  showDeleteModal.value = true;
};

const openEditModal = (id: number) => {
  navigateTo(`/portal/edit/${id}`);
};

const closeModal = () => {
  selectedId.value = null;
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  if (selectedId.value) {
    try {
      await deletePortal(selectedId.value);
      closeModal();
    } catch (err) {
      console.error("Gagal menghapus portal:", err);
    }
  }
};

const apiUrl = useRuntimeConfig().public.apiBase

const getLogoUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg"
  return path.startsWith("http") ? path : `${apiUrl}/${path}`;
}

const currentPage = ref(1);
const perPage = 8;

const totalPages = computed(() =>
  Math.ceil(portal.value.length / perPage)
);

const paginatedPortal = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return portal.value.slice(start, start + perPage);
});

onMounted(() => {
  fetchAllPortal();
});
</script>
