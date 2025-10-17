<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Buat Ekstrakurikuler Baru</h2>
      <NuxtLink to="/eskul/list-eskul">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Eskul</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama ekstrakurikuler..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar Eskul</label>
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />
        <div v-if="previewUrl" class="mt-3">
          <img :src="previewUrl" alt="Preview" class="w-full h-48 object-cover rounded-md" />
        </div>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi singkat ekstrakurikuler..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        ></textarea>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Pembina</label>
        <select
          v-model="form.pembina_id"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        >
          <option disabled value="">Pilih pembina</option>
          <option
            v-for="teacher in guru"
            :key="teacher.id"
            :value="teacher.id"
          >
            {{ teacher.full_name }}
          </option>
        </select>
      </div>

      <div class="flex justify-end p-4">
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>Simpan Eskul</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const { createEskul, loading,  } = UseEskul()
const { fetchGuru, guru } = UseTeacher()

const form = ref({
  name: '',
  description: '',
  pembina_id: '',
  image: null as File | null,
})

const previewUrl = ref<string | null>(null)

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    form.value.image = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

onMounted(async () => {
  await fetchGuru()
})

async function submitForm() {
  try {
    await createEskul(form.value)
    alert('Ekstrakurikuler berhasil dibuat!')
    navigateTo('/eskul/list-eskul')
  } catch (err) {
    console.error('Gagal membuat eskul:', err)
    alert('Gagal menyimpan eskul. Periksa kembali input.')
  }
}
</script>
