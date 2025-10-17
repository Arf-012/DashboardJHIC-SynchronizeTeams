<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Tambah Guru Baru</h2>
      <NuxtLink to="/guru/list-guru">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <!-- NIG -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">NIG</label>
        <input
          v-model="form.nig"
          type="text"
          placeholder="Masukkan NIG guru..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Lengkap</label>
        <input
          v-model="form.full_name"
          type="text"
          placeholder="Masukkan nama lengkap guru..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Posisi</label>
        <input
          v-model="form.position"
          type="text"
          placeholder="Misal: Guru"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- Mata Pelajaran -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Mata Pelajaran</label>
        <input
          v-model="form.subject"
          type="text"
          placeholder="Misal: Bahasa Inggris"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- Deskripsi -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <RichTextEditor
          v-model="form.description"
          rows="3"
          placeholder="Tuliskan deskripsi guru..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Upload Foto -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Foto Guru</label>
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />
        <div v-if="previewUrl" class="mt-3">
          <img
            :src="previewUrl"
            alt="Preview"
            class="w-full h-48 object-cover rounded-md border border-gray-300"
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
          <template v-if="loading">Mengirim...</template>
          <template v-else>Simpan Guru</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { CreateGuru, loading } = UseTeacher();

const form = ref({
  nig: "",
  full_name: "",
  position: "",
  subject: "",
  description: "",
  photo: null as File | null,
});

const previewUrl = ref<string | null>(null);

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.photo = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

async function submitForm() {
  try {
    await CreateGuru(form.value);
    alert("Guru berhasil ditambahkan!");
    navigateTo("/list-guru");
  } catch (err) {
    alert("Gagal menambahkan guru.");
  }
}
</script>

