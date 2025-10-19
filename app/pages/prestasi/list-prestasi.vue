<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <!-- Header -->
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Daftar Prestasi</h2>

      <NuxtLink to="/prestasi/create-prestasi">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
        >
          + Tambah Prestasi
        </button>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-10">
      Memuat data prestasi...
    </div>
    <div v-else-if="prestasi.length === 0" class="text-gray-500 text-center py-10">
      Tidak ada prestasi yang ditemukan
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <PrestasiCard
        v-for="item in paginatedPrestasi"
        :key="item.id"
        :achievement="item"
        @edit="editPrestasi"
        @delete="openConfirmModal(item.id)"
      />
    </div>

    <ConfirmModal
      :show="showConfirm"
      title="Hapus Prestasi"
      message="Apakah kamu yakin ingin menghapus prestasi ini?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
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
  </section>
</template>

<script setup lang="ts">
const { fetchAllPrestasi, prestasi, deletePrestasi, loading, error } =
  UsePrestasi();

const showConfirm = ref(false);
const selectedId = ref<number | null>(null);

onMounted(async () => {
  await fetchAllPrestasi();
});

function editPrestasi(item: any) {
  navigateTo(`/prestasi/edit/${item.id}`);
}

function openConfirmModal(id: number) {
  selectedId.value = id;
  showConfirm.value = true;
}

async function confirmDelete() {
  if (selectedId.value) {
    await deletePrestasi(selectedId.value);
    await fetchAllPrestasi();
  }
  showConfirm.value = false;
  selectedId.value = null;
}

function cancelDelete() {
  showConfirm.value = false;
  selectedId.value = null;
}

const currentPage = ref(1);
const perPage = 6;

const totalPages = computed(() => Math.ceil(prestasi.value.length / perPage));

const paginatedPrestasi = computed(() => {
  if (!Array.isArray(prestasi.value)) return [];
  const start = (currentPage.value - 1) * perPage;
  return prestasi.value.slice(start, start + perPage);
});
</script>
