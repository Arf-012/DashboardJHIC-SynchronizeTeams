<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Industri</h2>
      <NuxtLink to="/industri/list-industri">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div v-if="!loading && form" class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Industri</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Logo Industri</label>
        
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

    <div class="p-4">
      <label class="block text-sm font-medium text-primary-gray">Penerbit (Issuer)</label>
      <input
        v-model="form.website"
        type="text"
        placeholder="Masukkan penerbit..."
        class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
      />
    </div>
    
    <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <RichTextEditor
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi sertifikat..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

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

interface IndustriForm {
  name: string;
  logo: File | null;
  website: string;
  description: string;
}

const { fetchIndustriById, updateIndustri, loading, error, singleIndustri  } = UseIndustri()

const form = ref<IndustriForm>({
  name: "",
  logo: null,
  website: "",
  description: "",
});

const originalForm = ref<IndustriForm>({ ...form.value });

const updateLoading = ref(false);
const previewUrl = ref<string | null>(null);
const isImage = ref(true);
const newImage = ref<File | null>(null);
const currentImageUrl = ref<string | null>(null);
const removeImageFlag = ref(false);

const apiUrl = useRuntimeConfig().public.apiBase;

const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  return dateString.split('T')[0] ?? '';
};

onMounted(async () => {
  try {
    await fetchIndustriById(id as string);

    if (singleIndustri.value) {
      const data = singleIndustri.value;

      form.value = {
        name: data.name || '',
        logo: null,
        website: data.website || '',
        description: data.description || '',
      };

      originalForm.value = { ...form.value };

      // Set current image URL
      if (data.logo) {
        currentImageUrl.value = data.logo.startsWith('http')
          ? data.logo
          : `${apiUrl}/${data.logo}`;
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
    form.value.logo = file;
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
  form.value.logo = null;
  removeImageFlag.value = true;
}

// Reset form ke original
function resetForm() {
  form.value = { ...originalForm.value };
  newImage.value = null;
  previewUrl.value = null;
  removeImageFlag.value = false;

  // Reset current image URL
  if (singleIndustri.value?.logo) {
    currentImageUrl.value = singleIndustri.value.logo.startsWith('http') 
      ? singleIndustri.value.logo 
      : `${apiUrl}/${singleIndustri.value.logo}`;
  }
}

// Submit update sertifikat
async function submitForm() {
  try {
    updateLoading.value = true;

    const data = new FormData();
    data.append("name", form.value.name);
    data.append("website", form.value.website);
    data.append("description", form.value.description);

    if (newImage.value) {
      data.append("logo", newImage.value);
    } else if (removeImageFlag.value) {
      data.append("logo", "");
    }

    data.append("_method", "PUT"); 

    await updateIndustri( data, Number(id));

    alert("Industri berhasil diupdate!");
    navigateTo("/industri/list-industri");
  } catch (err) {
    console.error("Gagal mengupdate Industri", err);
    alert("Terjadi kesalahan saat mengupdate Industri");
  } finally {
    updateLoading.value = false;
  }
}
</script>
