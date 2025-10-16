<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Notification -->
    <transition name="slide">
      <div
        v-if="showNotification"
        class="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4 border-l-4 border-green-500"
      >
        <div class="flex items-center gap-3">
          <svg class="text-green-500" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-800 font-medium">{{ notificationMessage }}</p>
        </div>
      </div>
    </transition>

    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Manajemen Undangan Tamu</h1>
        <p class="text-gray-600">Kelola dan setujui undangan masuk untuk kalender pendidikan</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Pending Invitations Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-md p-6 mb-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <svg class="text-blue-600" width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Undangan Menunggu Persetujuan
              </h2>
              <span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                {{ invitations.length }} Undangan
              </span>
            </div>

            <div class="space-y-4">
              <div v-if="invitations.length === 0" class="text-center py-12">
                <svg class="mx-auto text-gray-300 mb-4" width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-gray-500 text-lg">Tidak ada undangan menunggu persetujuan</p>
              </div>

              <div
                v-for="invitation in invitations"
                :key="invitation.id"
                class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-1">{{ invitation.name }}</h3>
                    <p class="text-gray-600 font-medium">{{ invitation.institution }}</p>
                  </div>
                  <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Menunggu
                  </span>
                </div>

                <div class="grid grid-cols-2 gap-4 mb-4">
                  <div class="flex items-start gap-2">
                    <svg class="text-gray-400 mt-1" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-500">Email</p>
                      <p class="text-gray-800">{{ invitation.email }}</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-2">
                    <svg class="text-gray-400 mt-1" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p class="text-sm text-gray-500">Telepon</p>
                      <p class="text-gray-800">{{ invitation.phone }}</p>
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4 mb-4">
                  <p class="text-sm text-gray-500 mb-1">Tujuan Kunjungan</p>
                  <p class="text-gray-800 font-medium mb-3">{{ invitation.purpose }}</p>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <p class="text-sm text-gray-500">Tanggal & Waktu</p>
                      <p class="text-gray-800 font-medium">{{ invitation.date }} • {{ invitation.time }}</p>
                    </div>
                    <div>
                      <p class="text-sm text-gray-500">Durasi & Peserta</p>
                      <p class="text-gray-800 font-medium">{{ invitation.duration }} • {{ invitation.participants }} orang</p>
                    </div>
                  </div>
                </div>

                <div class="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
                  <p class="text-sm text-gray-600">
                    <span class="font-semibold">Catatan:</span> {{ invitation.notes }}
                  </p>
                </div>

                <div class="flex gap-3">
                  <button
                    @click="handleApprove(invitation)"
                    class="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Setujui & Tambah ke Kalender
                  </button>
                  <button
                    @click="handleReject(invitation.id)"
                    class="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Calendar Preview Section -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg class="text-purple-600" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Kalender Pendidikan
            </h2>
            
            <div class="mb-4">
              <div class="bg-purple-50 rounded-lg p-4 mb-3">
                <p class="text-center text-2xl font-bold text-purple-800">Oktober 2025</p>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <h3 class="font-semibold text-gray-700 text-sm uppercase">Acara Disetujui</h3>
              <p v-if="approvedEvents.length === 0" class="text-gray-500 text-sm text-center py-4">
                Belum ada acara yang disetujui
              </p>
              <div
                v-for="event in approvedEvents"
                :key="event.id"
                class="bg-green-50 border-l-4 border-green-500 rounded-lg p-3"
              >
                <div class="flex items-start gap-2 mb-2">
                  <svg class="text-green-600 mt-1 flex-shrink-0" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-800 text-sm">{{ event.purpose }}</p>
                    <p class="text-gray-600 text-xs">{{ event.name }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-600 ml-6">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ event.date }} • {{ event.time }}</span>
                </div>
              </div>
            </div>

            <div class="border-t pt-4">
              <div class="flex items-center justify-between text-sm mb-2">
                <span class="text-gray-600">Total Acara Bulan Ini</span>
                <span class="font-bold text-purple-600">{{ approvedEvents.length }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Menunggu Persetujuan</span>
                <span class="font-bold text-yellow-600">{{ invitations.length }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const invitations = ref([
  {
    id: 1,
    name: 'Dr. Ahmad Wijaya',
    email: 'ahmad.wijaya@email.com',
    phone: '+62 812-3456-7890',
    institution: 'Universitas Indonesia',
    purpose: 'Seminar Pendidikan Digital',
    date: '2025-10-25',
    time: '10:00',
    duration: '2 jam',
    participants: 50,
    notes: 'Memerlukan proyektor dan sound system',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Prof. Siti Nurhaliza',
    email: 'siti.nurhaliza@univ.ac.id',
    phone: '+62 813-9876-5432',
    institution: 'Institut Teknologi Bandung',
    purpose: 'Workshop Metodologi Penelitian',
    date: '2025-10-28',
    time: '13:00',
    duration: '3 jam',
    participants: 30,
    notes: 'Peserta membawa laptop masing-masing',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Ir. Budi Santoso',
    email: 'budi.santoso@company.com',
    phone: '+62 815-1234-5678',
    institution: 'PT Teknologi Nusantara',
    purpose: 'Kunjungan Industri & Career Talk',
    date: '2025-11-02',
    time: '09:00',
    duration: '4 jam',
    participants: 100,
    notes: 'Akan membawa materi presentasi dan goodie bag',
    status: 'pending'
  }
])

const approvedEvents = ref([])
const showNotification = ref(false)
const notificationMessage = ref('')

const handleApprove = (invitation) => {
  const event = {
    ...invitation,
    status: 'approved',
    approvedAt: new Date().toISOString()
  }
  
  approvedEvents.value.push(event)
  invitations.value = invitations.value.filter(inv => inv.id !== invitation.id)
  
  notificationMessage.value = `Undangan dari ${invitation.name} telah disetujui dan ditambahkan ke kalender`
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const handleReject = (id) => {
  const rejected = invitations.value.find(inv => inv.id === id)
  invitations.value = invitations.value.filter(inv => inv.id !== id)
  
  notificationMessage.value = `Undangan dari ${rejected.name} telah ditolak`
  showNotification.value = true
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>