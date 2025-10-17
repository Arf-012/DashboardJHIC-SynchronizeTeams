<template>
  <div class="p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Sertifikat</h2>
      <NuxtLink to="/sertifikat/list-sertifikat">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <!-- Form -->
    <div v-if="!loading && form" class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <!-- Nama Sertifikat -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Sertifikat</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- Issuer -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Penerbit (Issuer)</label>
        <input
          v-model="form.issuer"
          type="text"
          placeholder="Masukkan penerbit..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- File Sertifikat -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">File Sertifikat</label>
        
        <!-- Preview Gambar Saat Ini -->
        <div v-if="currentImageUrl && !newImage" class="mt-3 mb-4">
          <p class="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
          <img
            :src="currentImageUrl"
            alt="Preview Sertifikat Saat Ini"
            class="w-full max-w-xs h-48 object-cover rounded-md border"
          />
        </div>

        <input
          type="file"
          accept="image/*,application/pdf"
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <!-- Preview Gambar Baru -->
        <div v-if="previewUrl" class="mt-3">
          <p class="text-sm text-gray-600 mb-2">Preview gambar baru:</p>
          <img
            v-if="isImage"
            :src="previewUrl"
            alt="Preview Sertifikat Baru"
            class="w-full max-w-xs h-48 object-cover rounded-md border"
          />
          <p v-else class="text-gray-700 text-sm">File siap diunggah: {{ newImage?.name }}</p>
        </div>

        <!-- Tombol Hapus Gambar -->
        <button
          v-if="currentImageUrl"
          @click="removeCurrentImage"
          type="button"
          class="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Hapus Gambar Saat Ini
        </button>
      </div>

      <!-- Deskripsi Sertifikat -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <RichTextEditor
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Nomor Sertifikat -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nomor Sertifikat</label>
        <input
          v-model="form.certification_number"
          type="text"
          placeholder="Masukkan nomor sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Tanggal Terbit & Kadaluarsa -->
      <div class="p-4 flex gap-4">
        <div class="flex-1">
          <label class="block text-sm font-medium text-primary-gray">Tanggal Terbit</label>
          <input
            type="date"
            v-model="form.issue_date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium text-primary-gray">Tanggal Kadaluarsa</label>
          <input
            type="date"
            v-model="form.expiry_date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>
      </div>

      <!-- Tombol Simpan -->
      <div class="flex justify-end p-4 gap-3">
        <button
          @click="resetForm"
          class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-md transition"
        >
          Reset
        </button>
        <button
          @click="submitForm"
          :disabled="updateLoading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition disabled:opacity-50"
        >
          <template v-if="updateLoading">Memproses...</template>
          <template v-else>Update Sertifikat</template>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-pulse text-gray-500">Memuat data sertifikat...</div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const { id } = route.params;

// Interface TypeScript
interface SertifikatForm {
  name: string;
  issuer: string;
  description: string;
  image: File | null;
  certification_number: string;
  issue_date: string;
  expiry_date: string;
}

const { 
  singleSertifikat, 
  fetchSertifikatById, 
  updateSertifikat, 
  loading, 
  error 
} = useSertifikat();

// State form
const form = ref<SertifikatForm>({
  name: "",
  issuer: "",
  description: "",
  image: null,
  certification_number: "",
  issue_date: "",
  expiry_date: "",
});

const originalForm = ref<SertifikatForm>({ ...form.value });

const updateLoading = ref(false);
const previewUrl = ref<string | null>(null);
const isImage = ref(true);
const newImage = ref<File | null>(null);
const currentImageUrl = ref<string | null>(null);
const removeImageFlag = ref(false);

const apiUrl = useRuntimeConfig().public.apiBase;

// Format date untuk input[type="date"]
const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  return dateString.split('T')[0] ?? '';
};

// Load data sertifikat
onMounted(async () => {
  try {
    await fetchSertifikatById(id as string);

    if (singleSertifikat.value) {
      const data = singleSertifikat.value;

      form.value = {
        name: data.name || '',
        issuer: data.issuer || '',
        description: data.description || '',
        image: null,
        certification_number: data.certification_number || '',
        issue_date: formatDateForInput(data.issue_date),
        expiry_date: formatDateForInput(data.expiry_date),
      };

      originalForm.value = { ...form.value };

      // Set current image URL
      if (data.image) {
        currentImageUrl.value = data.image.startsWith('http')
          ? data.image
          : `${apiUrl}/${data.image}`;
      }
    }
  } catch (err) {
    console.error('Gagal memuat data sertifikat:', err);
  }
});

// Handle upload file baru
function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    newImage.value = file;
    form.value.image = file;
    isImage.value = file.type.startsWith("image/");
    previewUrl.value = isImage.value ? URL.createObjectURL(file) : null;
    removeImageFlag.value = false; // reset flag jika upload baru
  }
}

// Hapus gambar saat ini
function removeCurrentImage() {
  currentImageUrl.value = null;
  newImage.value = null;
  previewUrl.value = null;
  form.value.image = null;
  removeImageFlag.value = true;
}

// Reset form ke original
function resetForm() {
  form.value = { ...originalForm.value };
  newImage.value = null;
  previewUrl.value = null;
  removeImageFlag.value = false;

  // Reset current image URL
  if (singleSertifikat.value?.image) {
    currentImageUrl.value = singleSertifikat.value.image.startsWith('http') 
      ? singleSertifikat.value.image 
      : `${apiUrl}/${singleSertifikat.value.image}`;
  }
}

// Submit update sertifikat
async function submitForm() {
  try {
    updateLoading.value = true;

    const data = new FormData();
    data.append("name", form.value.name);
    data.append("issuer", form.value.issuer);
    data.append("description", form.value.description);
    data.append("certification_number", form.value.certification_number);
    data.append("issue_date", form.value.issue_date);
    data.append("expiry_date", form.value.expiry_date);

    if (newImage.value) {
      data.append("image", newImage.value);
    } else if (removeImageFlag.value) {
      data.append("image", ""); // backend bisa menangani sebagai hapus image
    }

    data.append("_method", "PUT"); // jika backend pakai method spoofing

    await updateSertifikat(id as string, data);

    alert("Sertifikat berhasil diupdate!");
    navigateTo("/sertifikat/list-sertifikat");
  } catch (err) {
    console.error("Gagal mengupdate sertifikat:", err);
    alert("Terjadi kesalahan saat mengupdate sertifikat.");
  } finally {
    updateLoading.value = false;
  }
}
</script>
