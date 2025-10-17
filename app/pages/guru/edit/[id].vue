<template>
  <div class="p-6 min-h-screen">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Edit Guru</h2>
      <NuxtLink to="/guru/list-guru">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>
    <div class="mx-auto rounded-2xl p-6">
    
      <!-- Loading -->
      <div v-if="loading" class="text-gray-500 animate-pulse">Memuat data guru...</div>

      <!-- Error -->
      <div v-else-if="error" class="text-red-500">Terjadi kesalahan: {{ error }}</div>

      <!-- Form -->
      <form v-else @submit.prevent="handleUpdate" class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
        <!-- NIG -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">NIG</label>
          <input
            v-model="form.nig"
            type="text"
            class="w-full border border-gray-300 outline-1 outline-secondary-red rounded-lg p-2 focus:outline-2"
          />
        </div>

        <!-- Nama Lengkap -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">Nama Lengkap</label>
          <input
            v-model="form.full_name"
            type="text"
            class="w-full border border-gray-300 outline-1 outline-secondary-red rounded-lg p-2 focus:outline-2"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-1">Posisi</label>
          <input
            v-model="form.position"
            type="text"
            class="w-full border border-gray-300 outline-1 outline-secondary-red rounded-lg p-2 focus:outline-2 "
          />
        </div>

        <div>
          <label class="block text-gray-700 font-semibold mb-1">Mata Pelajaran</label>
          <input
            v-model="form.subject"
            type="text"
            class="w-full border border-gray-300 outline-1 outline-secondary-red rounded-lg p-2 focus:outline-2"
          />
        </div>

        <!-- Deskripsi -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">Deskripsi</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full border border-gray-300 outline-1 outline-secondary-red rounded-lg p-2 focus:outline-2 resize-none"
          ></textarea>
        </div>

        <!-- Foto Lama -->
        <div v-if="oldPhoto" class="mb-2">
          <p class="text-gray-700 font-semibold mb-1">Foto Lama</p>
          <img
            :src="getImageUrl(oldPhoto)"
            alt="Foto Lama"
            class="w-32 h-32 object-cover rounded-lg border border-gray-300 outline-2 outline-secondary-red"
          />
        </div>

        <!-- Foto Baru -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">Foto Baru (opsional)</label>
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            class="w-full border border-gray-300 outline-1 outline-secondary-red rounded-lg p-2 focus:outline-2"
          />
          <div v-if="previewPhoto" class="mt-2">
            <p class="text-gray-700 font-semibold mb-1">Preview Foto Baru:</p>
            <img
              :src="previewPhoto"
              alt="Preview"
              class="w-32 h-32 object-cover rounded-lg border border-gray-300 outline-2 outline-secondary-red"
            />
          </div>
        </div>

        <!-- Tombol -->
        <div class="flex justify-end pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="bg-secondary-red hover:bg-secondary-red/50 text-white px-6 py-2 rounded-lg shadow-md transition duration-200"
          >
            {{ loading ? "Menyimpan..." : "Simpan Perubahan" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

const { fetchGuruById, updateGuru, loading, error } = UseTeacher();
const route = useRoute();
const router = useRouter();
const guruId = Number(route.params.id);

const form = reactive({
  nig: "",
  full_name: "",
  position: "",
  subject: "",
  description: "",
  photo: null as File | null,
});

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) form.photo = target.files[0];
};

const oldPhoto = ref("");
const previewPhoto = ref<string | null>(null);

const loadGuru = async () => {
  const guru = await fetchGuruById(guruId);
  form.nig = guru.nig;
  form.full_name = guru.full_name;
  form.position = guru.position;
  form.subject = guru.subject;
  form.description = guru.description;
};

const apiUrl = useRuntimeConfig().public.apiBase

const getImageUrl = (path?: string | null) => {
  if (!path) return "/images/default.jpg"
  return path.startsWith("http")
    ? path
    : `${apiUrl}/${path}`
}


const handleUpdate = async () => {
  await updateGuru(guruId, form);
  alert("Guru berhasil diperbarui!");
  router.push("/list-guru");
};

onMounted(loadGuru);
</script>
