<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Buat Event Baru</h2>
      <NuxtLink to="/event/list-event">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Judul Event</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul event..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar Event</label>
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
          placeholder="Tulis deskripsi singkat event..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        ></textarea>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Kategori</label>
        <select
          v-model="form.category"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        >
          <option disabled value="">Pilih tipe</option>
          <option value="kunjungan_industri">Kunjungan Industri</option>
          <option value="tamu">Tamu</option>
          <option value="acara_sekolah">Acara Sekolah</option>
          <option value="ujian">Ujian</option>
          <option value="libur">Libur</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-primary-gray">Tanggal Mulai</label>
          <input
            v-model="form.start_date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-primary-gray">Tanggal Berakhir</label>
          <input
            v-model="form.end_date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Lokasi</label>
        <input
          v-model="form.location"
          type="text"
          placeholder="Masukkan lokasi event..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Penyelenggara</label>
        <input
          v-model="form.organizer"
          type="text"
          placeholder="Masukkan nama penyelenggara..."
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
          <template v-else>Simpan Event</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  path: "/event/create-event",
});

const { createMading, loading } = UseMading()

const form = ref({
  title: '',
  description: '',
  category: '',
  start_date: '',
  end_date: '',
  location: '',
  organizer: '',
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

async function submitForm() {
  try {
    await createMading(form.value)
    alert('Event berhasil disimpan!')
    navigateTo('/event/list-event')
  } catch (err) {
    console.error('Gagal menyimpan event:', err)
    alert('Gagal menyimpan event. Periksa kembali input.')
  }
}
</script>