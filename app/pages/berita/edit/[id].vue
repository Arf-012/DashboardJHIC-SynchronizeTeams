<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Update Berita</h2>
            <NuxtLink to="/berita/list-berita"><button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md">Cancel</button></NuxtLink>
    </div>

    <form @submit.prevent="submitForm" class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class=" p-4 ">
        <label for="judul" class="block text-sm font-medium text-primary-gray">Judul Berita</label>
        <input
          v-model="form.judul"
          type="text"
          id="judul"
          placeholder="Masukkan judul berita..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
          required
        />
      </div>

      <div class="p-4">
        <label for="gambar" class="block text-sm font-medium text-primary-gray">Gambar Berita</label>
        <input
          type="file"
          id="gambar"
          accept="image/*"
          @change="handleImageUpload"
          class="mt-1 block w-full text-sm text-primary-gray border outline-2 outline-secondary-red border-gray-300 rounded-md cursor-pointer focus:outline-none p-1"
        />
        <div v-if="previewUrl" class="mt-3">
          <img :src="previewUrl" alt="Preview" class="w-full h-48 object-cover rounded-md" />
        </div>
      </div>

      <div class="p-4">
        <label for="isi" class="block text-sm font-medium text-primary-gray">Isi Berita</label>
        <textarea
          v-model="form.isi"
          id="isi"
          rows="6"
          placeholder="Tulis isi berita di sini..."
          class="mt-1 block w-full rounded-md outline-2 outline-secondary-red border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2"
          required
        ></textarea>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          Simpan Berita
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  judul: '',
  isi: '',
  gambar: null
})

const previewUrl = ref(null)

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.gambar = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

function submitForm() {
  console.log('Data berita:', form.value)
  alert('Berita berhasil disimpan! (simulasi)')
}
</script>
