<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Upload Gambar Galeri</h2>
      <NuxtLink to="/galeri/list-foto">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray mb-1">Judul</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul gambar..."
          class="block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray mb-1">Kategori</label>
        <select
          v-model="form.category"
          class="block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2 bg-white"
          required
        >
          <option disabled value="">Pilih kategori...</option>
          <option
            v-for="(cat, i) in categories"
            :key="i"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray mb-1">Gambar</label>
        <input
          type="file"
          accept="image/*"
          @change="handleFile"
          class="block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
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

const categories = [
  "berita",
  "mading",
  "galeri",
  "teacher",
  "eskul",
  "achievement",
  "testimonial",
  "saprol",
  "certification",
  "portal",
  "mitra",
  "profile",
];

const form = ref({
  category: "",
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
  if (!form.value.title || !form.value.category || !form.value.file_path) {
    alert("Pastikan semua field terisi dan gambar telah dipilih!");
    return;
  }

  try {
    const res = await uploadGallery(form.value);
    console.log("Upload berhasil:", res);
    alert("Gambar berhasil diunggah!");
    navigateTo("/galeri/list-foto");
  } catch (err) {
    console.error(err);
    alert("Gagal upload gambar.");
  }
}
</script>
