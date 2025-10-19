<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-800">Daftar Forum</h2>

      <NuxtLink to="/forum/create-forum">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md transition"
        >
          + Tambah Forum
        </button>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-10">
      Memuat data forum...
    </div>
    <div v-else-if="forumList.length === 0" class="text-gray-500 text-center py-10">
      Tidak ada forum yang ditemukan
    </div>

    <div v-else class="flex flex-col gap-6">
      <ForumCard
        v-for="item in forumList"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :description="item.description"
        :icon="getImageUrl(item.icon)"
        :isActive="item.is_active"
        @edit="editForum"
        @delete="openConfirmModal(item.id)"
      />
    </div>
  </section>

  <ConfirmModal
    :show="showConfirm"
    title="Hapus Forum"
    message="Apakah kamu yakin ingin menghapus forum ini?"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>

<script setup lang="ts">

const { fetchAllForum, forumList, loading, error, deleteForum } = UseForum()
const showConfirm = ref(false)
const selectedId = ref<number | null>(null)

const apiUrl = useRuntimeConfig().public.apiBase

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg"
  return path.startsWith("http")
    ? path
    : `${apiUrl}/${path}`
}
onMounted(async () => {
  await fetchAllForum()
})


function editForum(id: number) {
  navigateTo(`/forum/edit/${id}`)
}

function openConfirmModal(id: number) {
  selectedId.value = id
  showConfirm.value = true
}

async function confirmDelete() {
  if (selectedId.value) {
    await deleteForum(selectedId.value)
    await fetchAllForum()
  }
  showConfirm.value = false
  selectedId.value = null
}

function cancelDelete() {
  showConfirm.value = false
  selectedId.value = null
}
</script>
