<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Buat Berita Baru</h2>
      <NuxtLink to="/berita/list-berita">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Judul Berita</label>
        <input
          v-model="form.judul"
          type="text"
          placeholder="Masukkan judul berita..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar Berita</label>
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
        <label class="block text-sm font-medium text-primary-gray">Excerpt</label>
        <textarea
          v-model="form.excerpt"
          rows="2"
          placeholder="Tulis ringkasan singkat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        ></textarea>
      </div>

      <div class="p-4">
        <RichTextEditor
          v-model="form.isi"
          label="Isi Berita"
          placeholder="Tulis isi berita di sini..."
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Tags</label>
        <div class="flex flex-wrap gap-2 mt-2">
          <span
            v-for="(tag, index) in form.tags"
            :key="index"
            class="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-1"
          >
            {{ tag }}
            <button @click="removeTag(index)" class="text-xs text-red-500 hover:text-red-700">×</button>
          </span>
        </div>
        <input
          v-model="newTag"
          @keyup.enter="addTag"
          placeholder="Tekan Enter untuk menambah tag"
          class="mt-2 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <div class="flex justify-end p-4">
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>Simpan Berita</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { createBerita, loading } = useBerita()

const form = ref({
  judul: '',
  isi: '',
  gambar: null as File | null,
  excerpt: '',
  status: 'draft',
  tags: [] as string[],
})

const previewUrl = ref<string | null>(null)
const newTag = ref('')

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    form.value.gambar = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

function addTag() {
  const tag = newTag.value.trim()
  if (tag && !form.value.tags.includes(tag)) {
    form.value.tags.push(tag)
  }
  newTag.value = ''
}

function removeTag(index: number) {
  form.value.tags.splice(index, 1)
}

async function submitForm() {
  try {
    const result = await createBerita(form.value)
    console.log('Berita berhasil disimpan:', result)
    alert('Berita berhasil disimpan!')
    navigateTo('/berita/list-berita')
  } catch (err) {
    console.error('Gagal menyimpan:', err)
    alert('Gagal menyimpan berita. Periksa kembali input.')
  }
}
</script>
