<template>
  <div class="p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Testimoni</h2>
      <NuxtLink to="/testimoni/list-testimoni">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <!-- Form -->
    <div v-if="!loading && form" class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <!-- Nama -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- Posisi -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Posisi</label>
        <input
          v-model="form.position"
          type="text"
          placeholder="Masukkan posisi..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Foto Testimoni -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Foto</label>

        <!-- Preview Foto Saat Ini -->
        <div v-if="currentImageUrl && !newImage" class="mt-3 mb-4">
          <p class="text-sm text-gray-600 mb-2">Foto saat ini:</p>
          <img
            :src="currentImageUrl"
            alt="Preview Foto Testimoni"
            class="w-full max-w-xs h-48 object-cover rounded-md border"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <!-- Preview Foto Baru -->
        <div v-if="previewUrl" class="mt-3">
          <p class="text-sm text-gray-600 mb-2">Preview foto baru:</p>
          <img
            v-if="isImage"
            :src="previewUrl"
            alt="Preview Foto Testimoni Baru"
            class="w-full max-w-xs h-48 object-cover rounded-md border"
          />
        </div>

        <!-- Tombol Hapus Foto -->
        <button
          v-if="currentImageUrl"
          @click="removeCurrentImage"
          type="button"
          class="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Hapus Foto Saat Ini
        </button>
      </div>

      <!-- Testimonial -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Testimonial</label>
        <textarea
          v-model="form.testimonial"
          rows="4"
          placeholder="Tulis testimonial..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        ></textarea>
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
          <template v-else>Update Testimoni</template>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-pulse text-gray-500">Memuat data testimoni...</div>
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

interface TestimoniForm {
  name: string;
  position: string;
  testimonial: string;
  photo: File | null;
}

const { 
  singleTestimoni, 
  fetchTestimoniById, 
  updateTestimoni, 
  loading, 
  error 
} = useTestimoni();

// State form
const form = ref<TestimoniForm>({
  name: "",
  position: "",
  testimonial: "",
  photo: null,
});

const originalForm = ref<TestimoniForm>({ ...form.value });
const updateLoading = ref(false);
const previewUrl = ref<string | null>(null);
const isImage = ref(true);
const newImage = ref<File | null>(null);
const currentImageUrl = ref<string | null>(null);
const removeImageFlag = ref(false);

const apiUrl = useRuntimeConfig().public.apiBase;

// Fetch data testimoni
onMounted(async () => {
  try {
    await fetchTestimoniById(id as string);

    if (singleTestimoni.value) {
      const data = singleTestimoni.value;

      form.value = {
        name: data.name || "",
        position: data.position || "",
        testimonial: data.testimonial || "",
        photo: null,
      };

      originalForm.value = { ...form.value };

      if (data.photo) {
        currentImageUrl.value = data.photo.startsWith("http")
          ? data.photo
          : `${apiUrl}/${data.photo}`;
      }
    }
  } catch (err) {
    console.error("Gagal memuat data testimoni:", err);
  }
});

// Handle upload foto baru
function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    newImage.value = file;
    form.value.photo = file;
    isImage.value = file.type.startsWith("image/");
    previewUrl.value = isImage.value ? URL.createObjectURL(file) : null;
    removeImageFlag.value = false;
  }
}

// Hapus foto saat ini
function removeCurrentImage() {
  currentImageUrl.value = null;
  newImage.value = null;
  previewUrl.value = null;
  form.value.photo = null;
  removeImageFlag.value = true;
}

// Reset form
function resetForm() {
  form.value = { ...originalForm.value };
  newImage.value = null;
  previewUrl.value = null;
  removeImageFlag.value = false;

  if (singleTestimoni.value?.photo) {
    currentImageUrl.value = singleTestimoni.value.photo.startsWith("http")
      ? singleTestimoni.value.photo
      : `${apiUrl}/${singleTestimoni.value.photo}`;
  }
}

// Submit update testimoni
async function submitForm() {
  try {
    updateLoading.value = true;

    const data = new FormData();
    data.append("name", form.value.name);
    data.append("position", form.value.position);
    data.append("testimonial", form.value.testimonial);

    if (newImage.value) {
      data.append("photo", newImage.value);
    } else if (removeImageFlag.value) {
      data.append("photo", ""); 
    }

    data.append("_method", "PUT");

    await updateTestimoni(id as string, data);

    alert("Testimoni berhasil diupdate!");
    navigateTo("/testimoni/list-testimoni");
  } catch (err) {
    console.error("Gagal mengupdate testimoni:", err);
    alert("Terjadi kesalahan saat mengupdate testimoni.");
  } finally {
    updateLoading.value = false;
  }
}
</script>
