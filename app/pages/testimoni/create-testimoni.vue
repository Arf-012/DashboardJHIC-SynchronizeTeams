<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Buat Testimoni</h2>
      <NuxtLink to="/testimoni/list-testimoni">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Posisi</label>
        <input
          v-model="form.position"
          type="text"
          placeholder="Masukkan posisi..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Foto</label>
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
            class="w-full max-w-xs h-48 object-cover rounded-md border"
          />
        </div>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Testimonial</label>
        <textarea
          v-model="form.testimonial"
          rows="4"
          placeholder="Tulis testimonial..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        ></textarea>
      </div>

      <div class="flex justify-end p-4">
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition disabled:opacity-50"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>Buat Testimoni</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "#imports";

interface TestimoniForm {
  name: string;
  position: string;
  testimonial: string;
  photo: File | null;
}

const { createTestimoni, loading } = useTestimoni();

const form = ref<TestimoniForm>({
  name: "",
  position: "",
  testimonial: "",
  photo: null,
});

const previewUrl = ref<string | null>(null);
const isImage = ref(true);

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.photo = file;
    isImage.value = file.type.startsWith("image/");
    previewUrl.value = isImage.value ? URL.createObjectURL(file) : null;
  }
}

async function submitForm() {
  try {
    const data = new FormData();
    data.append("name", form.value.name);
    data.append("position", form.value.position);
    data.append("testimonial", form.value.testimonial);
    if (form.value.photo) data.append("photo", form.value.photo);

    await createTestimoni(data);
    alert("Testimoni berhasil dibuat!");
    navigateTo("/testimoni/list-testimoni");
  } catch (err) {
    console.error("Gagal membuat testimoni:", err);
    alert("Terjadi kesalahan saat membuat testimoni.");
  }
}
</script>
