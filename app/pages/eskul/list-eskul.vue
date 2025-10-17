<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Daftar Ekstrakurikuler</h2>

      <NuxtLink to="/eskul/create-eskul">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
        >
          + Tambah Eskul
        </button>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-10">
      Memuat data eskul...
    </div>
    <div v-else-if="error" class="text-red-500 text-center py-10">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <EskulCard
        v-for="item in eskulList"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :description="item.description"
        :image="getImageUrl(item.image)"
        :pembinaName="item.Pembina?.full_name"
        @edit="editEskul"
        @delete="openConfirmModal(item.id)"
      />
    </div>
  </section>

    <ConfirmModal
      :show="showConfirm"
      title="Hapus Eskul"
      message="Apakah kamu yakin ingin menghapus eskul ini?"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
</template>

<script setup lang="ts">
const { FetchAllEskul, loading, error, eskulList, deleteEskul } = UseEskul();
const showConfirm = ref(false)
const selectedId = ref<number | null>(null)

onMounted(async () => {
  await FetchAllEskul();
});

const getImageUrl = (path: string) => {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http")
    ? path
    : `https://api-infra.synchronizeteams.my.id/${path}`;
};

function editEskul(id: number) {
  navigateTo(`/eskul/edit/${id}`);
}

function openConfirmModal(id: number) {
  selectedId.value = id
  showConfirm.value = true
}

async function confirmDelete() {
  if (selectedId.value) {
    await deleteEskul(selectedId.value)
    await FetchAllEskul()
  }
  showConfirm.value = false
  selectedId.value = null
}

// 🔹 Batal hapus
function cancelDelete() {
  showConfirm.value = false
  selectedId.value = null
}
</script>
