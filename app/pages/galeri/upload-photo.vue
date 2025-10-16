<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Upload Gambar Galeri</h2>
      <NuxtLink to="/galeri/list">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <!-- Judul -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Judul</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul gambar..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Kategori</label>
        <input
          v-model="form.category"
          type="text"
          placeholder="Misal: galeri"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFile"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />
        <div v-if="previewUrl" class="mt-3">
          <img :src="previewUrl" class="w-full h-48 object-cover rounded-md" />
        </div>
      </div>

      <div class="flex justify-end p-4">
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          <template v-if="loading">Mengunggah...</template>
          <template v-else>Upload Gambar</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { uploadGallery, loading } = useUseGaleri();

const form = ref({
  category: "galeri",
  title: "",
  file_path: null as File | null,
});

const previewUrl = ref<string | null>(null);

function handleFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.file_path = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function submitForm() {
  if (!form.value.file_path) {
    alert("Pilih gambar terlebih dahulu!");
    return;
  }

  try {
    const res = await uploadGallery(form.value);
    console.log("Upload berhasil:", res);
    alert("Gambar berhasil diunggah!");
    navigateTo("/galeri/list-foto");
  } catch (err) {
    alert("Gagal upload gambar.");
  }
}
</script>
