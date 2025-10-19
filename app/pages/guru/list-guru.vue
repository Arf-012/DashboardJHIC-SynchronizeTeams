<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Daftar Guru</h2>
      <NuxtLink to="/guru/create-guru">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
        >
          Tambah
        </button>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-10">
      Memuat data guru...
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <GuruCard
        v-for="g in paginatedGuru"
        :key="g.id"
        :image-url="getImageUrl(g.photo)"
        :title="g.full_name"
        :subtitle="g.subject"
        @show-detail="showDetail(g)"
        @edit="editGuru(g.id)"
        @delete="openDeleteModal(g.id)"
      />
    </div>

    <div
      v-if="!loading && guru.length === 0"
      class="text-center text-gray-500 py-10"
    >
      Belum ada data guru tersedia.
    </div>

    <GuruModal
      v-if="selectedGuru"
      :guru="selectedGuru"
      @close="selectedGuru = null"
    />
    <ConfirmModal
      :show="showModal"
      title="Hapus Guru"
      message="Apakah kamu yakin ingin menghapus Guru ini?"
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
  </section>
</template>

<script setup lang="ts">
import type { Guru } from "~/types/main.type";

const { guru, fetchGuru, loading, error, deleteGuru } = UseTeacher();

const selectedGuru = ref<Guru | null>(null);
const showModal = ref(false);
const selectedId = ref<number | null>(null);

const apiUrl = useRuntimeConfig().public.apiBase;

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http") ? path : `${apiUrl}/${path}`;
};
const showDetail = (guruData: Guru) => {
  selectedGuru.value = guruData;
};

const editGuru = (id: number) => {
  navigateTo(`/guru/edit/${id}`);
};

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
    await deleteGuru(selectedId.value);
    closeModal();
  }
};

const currentPage = ref(1);
const perPage = 8;

const totalPages = computed(() => Math.ceil(guru.value.length / perPage));

const paginatedGuru = computed(() => {
  if (!Array.isArray(guru.value)) return [];
  const start = (currentPage.value - 1) * perPage;
  return guru.value.slice(start, start + perPage);
});

onMounted(() => {
  fetchGuru();
});
</script>
