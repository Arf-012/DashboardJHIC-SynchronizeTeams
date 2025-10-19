<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Buat Mading</h2>
      <NuxtLink to="/mading/list-mading">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Judul</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul mading..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Tipe</label>
        <select
          v-model="form.type"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        >
          <option disabled value="">Pilih tipe</option>
          <option value="infographic">infographic</option>
          <option value="announcement">announcement</option>
        </select>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <div v-if="previewUrl" class="mt-3">
          <img
            v-if="isImage"
            :src="previewUrl"
            alt="Preview"
            class="w-full h-48 object-cover rounded-md"
          />
        </div>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Konten</label>
        <RichTextEditor
          v-model="form.content"
          rows="4"
          placeholder="Tulis isi mading..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <div class="flex justify-end p-4">
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>Buat Mading</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  path: "/mading/create-mading",
});

interface MadingForm {
  title: string;
  type: string;
  content: string;
  image: File | null;
}

const { createMading, loading } = UseEvent();

const form = ref<MadingForm>({
  title: "",
  type: "",
  content: "",
  image: null,
});

const previewUrl = ref<string | null>(null);
const isImage = ref(true);

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.image = file;
    isImage.value = file.type.startsWith("image/");
    previewUrl.value = isImage.value ? URL.createObjectURL(file) : null;
  }
}

async function submitForm() {
  try {
    const data = new FormData();
    data.append("title", form.value.title);
    data.append("type", form.value.type);
    data.append("content", form.value.content);
    if (form.value.image) data.append("image", form.value.image);

    await createMading(data);
    alert("Mading berhasil dibuat!");
    navigateTo("/mading/list-mading");
  } catch (err) {
    console.error("Gagal membuat mading:", err);
    alert("Terjadi kesalahan saat membuat mading.");
  }
}
</script>
