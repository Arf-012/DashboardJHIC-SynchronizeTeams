<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Kelola Galeri</h1>
          <button
            @click="showUploadModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Upload Foto
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Total Foto</p>
              <p class="text-2xl font-bold text-gray-900">{{ photos.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Dipublikasi</p>
              <p class="text-2xl font-bold text-gray-900">{{ publishedCount }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Draft</p>
              <p class="text-2xl font-bold text-gray-900">{{ draftCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & Search -->
      <div class="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-200">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari foto..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Status</option>
            <option value="published">Dipublikasi</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="photo in filteredPhotos"
          :key="photo.id"
          class="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="aspect-square relative group">
            <img
              :src="photo.url"
              :alt="photo.title"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                @click="viewPhoto(photo)"
                class="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                title="Lihat"
              >
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button
                @click="editPhoto(photo)"
                class="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
                title="Edit"
              >
                <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="deletePhoto(photo)"
                class="p-2 bg-white rounded-lg hover:bg-red-50 transition-colors"
                title="Hapus"
              >
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-gray-900 truncate">{{ photo.title }}</h3>
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  photo.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                ]"
              >
                {{ photo.status === 'published' ? 'Publik' : 'Draft' }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ photo.description }}</p>
            <div class="flex items-center text-xs text-gray-500">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ photo.date }}
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPhotos.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada foto</h3>
        <p class="text-gray-600">{{ searchQuery ? 'Tidak ada hasil yang cocok dengan pencarian Anda' : 'Mulai upload foto untuk galeri Anda' }}</p>
      </div>
    </main>

    <!-- Upload Modal (placeholder) -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h2 class="text-xl font-bold mb-4">Upload Foto</h2>
        <p class="text-gray-600 mb-4">Fitur upload akan diimplementasikan di sini</p>
        <button
          @click="showUploadModal = false"
          class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const filterStatus = ref('all')
const showUploadModal = ref(false)

// Sample data - ganti dengan data dari API
const photos = ref([
  {
    id: 1,
    title: 'Pemandangan Gunung',
    description: 'Foto pemandangan gunung yang indah saat matahari terbit',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    status: 'published',
    date: '12 Okt 2025'
  },
  {
    id: 2,
    title: 'Pantai Sunset',
    description: 'Momen sunset di pantai yang menakjubkan',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
    status: 'published',
    date: '11 Okt 2025'
  },
  {
    id: 3,
    title: 'Kota Malam',
    description: 'Suasana kota di malam hari dengan lampu-lampu yang berkilauan',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400',
    status: 'draft',
    date: '10 Okt 2025'
  },
  {
    id: 4,
    title: 'Hutan Tropis',
    description: 'Keindahan hutan tropis dengan pepohonan hijau',
    url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400',
    status: 'published',
    date: '9 Okt 2025'
  },
  {
    id: 5,
    title: 'Danau Tenang',
    description: 'Pemandangan danau yang tenang dengan refleksi sempurna',
    url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
    status: 'published',
    date: '8 Okt 2025'
  },
  {
    id: 6,
    title: 'Bunga Musim Semi',
    description: 'Koleksi bunga-bunga indah di musim semi',
    url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400',
    status: 'draft',
    date: '7 Okt 2025'
  }
])

const filteredPhotos = computed(() => {
  return photos.value.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === 'all' || photo.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const publishedCount = computed(() => photos.value.filter(p => p.status === 'published').length)
const draftCount = computed(() => photos.value.filter(p => p.status === 'draft').length)

const viewPhoto = (photo) => {
  alert(`Melihat: ${photo.title}`)
}

const editPhoto = (photo) => {
  alert(`Mengedit: ${photo.title}`)
}

const deletePhoto = (photo) => {
  if (confirm(`Apakah Anda yakin ingin menghapus "${photo.title}"?`)) {
    const index = photos.value.findIndex(p => p.id === photo.id)
    if (index !== -1) {
      photos.value.splice(index, 1)
    }
  }
}
</script>