<template>
  <section class="p-8 flex flex-col gap-8 min-h-screen">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Daftar Guru</h2>
      <NuxtLink to="/guru/create-guru">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Tambah
        </button>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-gray-500 text-center py-10">
      Memuat data guru...
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-10">
      {{ error }}
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <GuruCard
        v-for="g in guru"
        :key="g.id"
        :guru="g"
        @show-detail="showDetail"
      />
    </div>

    <div v-if="!loading && guru.length === 0" class="text-center text-gray-500 py-10">
      Belum ada data guru tersedia.
    </div>
    <GuruModal v-if="selectedGuru" :guru="selectedGuru" @close="selectedGuru = null" />
  </section>
</template>

<script setup lang="ts">
import type { Guru } from '~/types/main.type'

const { guru, fetchGuru, loading, error } = UseTeacher()

const getImageUrl = (path: string) => {
  if (!path) return '/images/default.jpg'
  return path.startsWith('http')
    ? path
    : `https://api-infra.synchronizeteams.my.id/${path}`
}

onMounted(() => {
  fetchGuru()
})

const selectedGuru = ref<Guru | null>(null)

const showDetail = (guruData: Guru) => {
  selectedGuru.value = guruData
}
</script>
