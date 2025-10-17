<template>
  <div class="p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Forum</h2>
      <NuxtLink to="/forum/list-forum">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <!-- Form -->
    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <!-- Nama Forum -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Forum</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama forum..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- Icon Forum -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Icon Forum</label>
        <input
          type="file"
          accept="image/*"
          @change="handleIconUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <!-- Preview -->
        <div v-if="previewUrl" class="mt-3">
          <img
            :src="getImageUrl(previewUrl)"
            alt="Preview"
            class="w-full h-48 object-cover rounded-md"
          />
        </div>
      </div>

      <!-- Deskripsi -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <RichTextEditor
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi forum..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Status Aktif -->
      <div class="p-4 flex items-center gap-2">
        <input
          id="is_active"
          type="checkbox"
          v-model="form.is_active"
          class="w-4 h-4 text-secondary-red border-gray-300 rounded"
        />
        <label for="is_active" class="text-sm text-gray-700 select-none">
          Aktifkan Forum
        </label>
      </div>

      <!-- Tombol Simpan -->
      <div class="flex justify-end p-4">
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>Update Forum</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const forumId = Number(route.params.id);

const { getForumById, updateForum, loading } = UseForum();

const form = ref({
  name: "",
  description: "",
  icon: null as File | null,
  image: "",
  is_active: true,
});

const previewUrl = ref<string | null>(null);
const apiUrl = useRuntimeConfig().public.apiBase;

function handleIconUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.icon = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

function getImageUrl(path?: string | null) {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http") ? path : `${apiUrl}/${path}`;
}

onMounted(async () => {
  const data = await getForumById(forumId);
  if (data) {
    form.value.name = data.name || "";
    form.value.description = data.description || "";
    form.value.image = data.icon || "";
    form.value.is_active = data.is_active ?? true;
    previewUrl.value = data.icon ? data.icon : null;
  }
});

async function submitForm() {
  try {
    await updateForum(String(forumId), form.value);
    alert("Forum berhasil diperbarui!");
    navigateTo("/forum/list-forum");
  } catch (err) {
    console.error("Gagal update forum:", err);
    alert("Terjadi kesalahan saat update forum.");
  }
}
</script>
