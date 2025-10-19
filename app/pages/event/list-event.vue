<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Mading</h2>

      <div class="flex flex-wrap justify-center gap-2">
        <NuxtLink to="/mading/create-mading">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
          >
            Tambah Mading
          </button>
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-8 animate-pulse">
      Memuat Mading...
    </div>

    <div
      v-else-if="MadingList.length === 0"
      class="text-gray-500 text-center py-8"
    >
      Tidak ada Mading yang ditemukan
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <MadingCard
        v-for="item in paginatedMading"
        :key="item.id"
        v-bind="{
          id: item.id,
          title: item.title,
          type: item.type,
          content: item.content,
          image: getImageUrl(item.image),
          status: item.status,
          is_active: item.is_active,
        }"
        @edit="openEditModal(item)"
        @delete="openDeleteModal(item.id)"
        @update="openEdit(item.id)"
      />
    </div>

    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 class="text-lg font-semibold mb-4">Edit Status Mading</h2>

        <div class="flex flex-col gap-4">
          <label class="text-sm font-medium">Status</label>
          <select
            v-model="selectedMading!.status"
            class="border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div class="flex justify-end gap-2 mt-4">
            <button
              @click="closeEditModal"
              class="px-3 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
            >
              Batal
            </button>
            <button
              @click="saveStatus"
              class="px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>

    <ConfirmModal
      :show="showDeleteModal"
      title="Hapus Mading"
      message="Apakah kamu yakin ingin menghapus Mading ini?"
      @confirm="confirmDelete"
      @cancel="closeDeleteModal"
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
import type { Acara } from "~/types/main.type";

definePageMeta({
  path: "/mading/list-mading",
});

const {
  fetchAllMading,
  loading,
  error,
  MadingList,
  deleteMading,
  changeMadingStatus,
} = UseEvent();

const showDeleteModal = ref(false);
const selectedId = ref<number | null>(null);

const openDeleteModal = (id: number) => {
  selectedId.value = id;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  selectedId.value = null;
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  if (selectedId.value) {
    try {
      await deleteMading(selectedId.value);
      closeDeleteModal();
    } catch (err) {
      console.error("Gagal menghapus mading:", err);
    }
  }
};

const openEdit = (id: number) => {
  navigateTo(`/mading/edit/${id}`);
};

const showEditModal = ref(false);
const selectedMading = ref<Acara | null>(null);

const openEditModal = (item: Acara) => {
  selectedMading.value = { ...item };
  showEditModal.value = true;
};

const closeEditModal = () => {
  showEditModal.value = false;
  selectedMading.value = null;
};

const saveStatus = async () => {
  if (!selectedMading.value) return;
  try {
    await changeMadingStatus(
      selectedMading.value.id,
      selectedMading.value.status
    );

    const index = MadingList.value.findIndex(
      (m) => m.id === selectedMading.value?.id
    );
    if (selectedMading.value && MadingList.value[index]) {
      MadingList.value[index].status = selectedMading.value.status;
    }
    closeEditModal();
  } catch (err) {
    console.error("Gagal mengubah status:", err);
  }
};

const currentPage = ref(1);
const perPage = 8;

const totalPages = computed(() => Math.ceil(MadingList.value.length / perPage));

const paginatedMading = computed(() => {
  if (!Array.isArray(MadingList.value)) return [];
  const start = (currentPage.value - 1) * perPage;
  return MadingList.value.slice(start, start + perPage);
});

const apiUrl = useRuntimeConfig().public.apiBase;
const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http") ? path : `${apiUrl}/${path}`;
};

onMounted(() => {
  fetchAllMading();
});
</script>
