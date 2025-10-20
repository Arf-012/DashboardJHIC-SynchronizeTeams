<template>
  <div class="p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Buat Sertifikat</h2>
      <NuxtLink to="/sertifikat/list-sertifikat">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Sertifikat</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- Issuer -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Penerbit (Issuer)</label>
        <input
          v-model="form.issuer"
          type="text"
          placeholder="Masukkan penerbit..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- File Sertifikat -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">File Sertifikat</label>
        <input
          type="file"
          accept="image/*,application/pdf"
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <!-- Preview -->
        <div v-if="previewUrl" class="mt-3">
          <img
            v-if="isImage"
            :src="previewUrl"
            alt="Preview"
            class="w-full h-48 object-cover rounded-md"
          />
          <p v-else class="text-gray-700 text-sm">File siap diunggah: {{ form.image?.name }}</p>
        </div>
      </div>

      <!-- Deskripsi Sertifikat -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <RichTextEditor
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Nomor Sertifikat -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nomor Sertifikat</label>
        <input
          v-model="form.certification_number"
          type="text"
          placeholder="Masukkan nomor sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Tanggal Terbit & Kadaluarsa -->
      <div class="p-4 flex gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-primary-gray">Tanggal Terbit</label>
          <input
            type="date"
            v-model="form.issue_date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-primary-gray">Tanggal Kadaluarsa</label>
          <input
            type="date"
            v-model="form.expiry_date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>
      </div>

      <!-- Tombol Simpan -->
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

// Interface TypeScript
interface SertifikatForm {
  name: string;
  issuer: string;
  description: string;
  image: File | null;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}

const { createSertifikat, loading } = useSertifikat();

const form = ref<SertifikatForm>({
  name: "",
  issuer: "",
  description: "",
  image: null,
  certification_number: "",
  issue_date: "",
  expiry_date: "",
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
    // Menggunakan FormData untuk file upload
    const data = new FormData();
    data.append("name", form.value.name);
    data.append("issuer", form.value.issuer);
    data.append("description", form.value.description);
    if (form.value.image) data.append("image", form.value.image);
    data.append("certification_number", form.value.certification_number);
    data.append("issue_date", form.value.issue_date);
    data.append("expiry_date", form.value.expiry_date);

    await createSertifikat(data);
    alert("Sertifikat berhasil dibuat!");
    navigateTo("/sertifikat/list-sertifikat");
  } catch (err) {
    console.error("Gagal membuat sertifikat:", err);
    alert("Terjadi kesalahan saat membuat sertifikat.");
  }
}
</script>
