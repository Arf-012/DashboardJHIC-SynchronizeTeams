<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Buat Industri</h2>
      <NuxtLink to="/industri/list-industri">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Industri</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama Industri..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Logo Industri</label>
        <input
        type="file"
        accept="image/*,application/pdf"
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
          <p v-else class="text-gray-700 text-sm">File siap diunggah: {{ form.logo?.name }}</p>
        </div>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Website</label>
        <input
          v-model="form.website"
          type="text"
          placeholder="Masukkan url website"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <RichTextEditor
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi sertifikat..."
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
          <template v-else>Buat Sertifikat</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "#imports";

interface IndustriForm {
  name: string;
  logo: File | null;
  website: string;
  description: string;
}

const { createIndustri, loading } = UseIndustri()

const form = ref<IndustriForm>({
  name: "",
  logo: null,
  website: "",
  description: "",
});

const previewUrl = ref<string | null>(null);
const isImage = ref(true);

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.logo = file;
    isImage.value = file.type.startsWith("image/");
    previewUrl.value = isImage.value ? URL.createObjectURL(file) : null;
  }
}

async function submitForm() {
  try {
    const data = new FormData();
    data.append("name", form.value.name);
    data.append("website", form.value.website);
    data.append("description", form.value.description);
    if (form.value.logo) data.append("logo", form.value.logo);

    await createIndustri(data);
    alert("Sertifikat berhasil dibuat!");
    navigateTo("/industri/list-industri");
  } catch (err) {
    console.error("Gagal membuat sertifikat:", err);
    alert("Terjadi kesalahan saat membuat sertifikat.");
  }
}
</script>
