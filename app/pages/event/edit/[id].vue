<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Mading</h2>
      <NuxtLink to="/mading/list-mading">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div
      v-if="!loading && form"
      class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red"
    >
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Judul Mading</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul mading..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Tipe</label>
        <select
          v-model="form.type"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        >
          <option disabled value="">Pilih tipe</option>
          <option value="umum">Umum</option>
          <option value="event">Event</option>
          <option value="pengumuman">Pengumuman</option>
        </select>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar Mading</label>

        <div v-if="currentImageUrl && !newImage" class="mt-3 mb-4">
          <p class="text-sm text-gray-600 mb-2">Gambar saat ini:</p>
          <img
            :src="currentImageUrl"
            alt="Gambar Saat Ini"
            class="w-full max-w-xs h-48 object-cover rounded-md border"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <div v-if="previewUrl" class="mt-3">
          <p class="text-sm text-gray-600 mb-2">Preview gambar baru:</p>
          <img
            v-if="isImage"
            :src="previewUrl"
            alt="Preview Baru"
            class="w-full max-w-xs h-48 object-cover rounded-md border"
          />
          <p v-else class="text-gray-700 text-sm">
            File siap diunggah: {{ newImage?.name }}
          </p>
        </div>

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
        <label class="block text-sm font-medium text-primary-gray">Konten</label>
        <RichTextEditor
          v-model="form.content"
          rows="4"
          placeholder="Tulis isi mading..."
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
          <template v-else>Update Mading</template>
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-8">
      <div class="animate-pulse text-gray-500">Memuat data mading...</div>
    </div>

    <div v-if="error" class="text-center py-8 text-red-500">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  path: "/mading/edit/:id",
});

const route = useRoute();
const { id } = route.params;

interface MadingForm {
  title: string;
  type: string;
  content: string;
  image: File | null;
}

const {
  fetchMadingById,
  updateMading,
  loading,
  error,
  singleMading,
} = UseEvent();

const form = ref<MadingForm>({
  title: "",
  type: "",
  content: "",
  image: null,
});

const originalForm = ref<MadingForm>({ ...form.value });
const updateLoading = ref(false);
const previewUrl = ref<string | null>(null);
const isImage = ref(true);
const newImage = ref<File | null>(null);
const currentImageUrl = ref<string | null>(null);
const removeImageFlag = ref(false);
const apiUrl = useRuntimeConfig().public.apiBase;

onMounted(async () => {
  try {
    await fetchMadingById(Number(id));
    if (singleMading.value) {
      const data = singleMading.value;

      form.value = {
        title: data.title || "",
        type: data.type || "",
        content: data.content || "",
        image: null,
      };

      originalForm.value = { ...form.value };

      if (data.image) {
        currentImageUrl.value = data.image.startsWith("http")
          ? data.image
          : `${apiUrl}/${data.image}`;
      }
    }
  } catch (err) {
    console.error("Gagal memuat data mading:", err);
  }
});

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    newImage.value = file;
    form.value.image = file;
    isImage.value = file.type.startsWith("image/");
    previewUrl.value = isImage.value ? URL.createObjectURL(file) : null;
    removeImageFlag.value = false;
  }
}

function removeCurrentImage() {
  currentImageUrl.value = null;
  newImage.value = null;
  previewUrl.value = null;
  form.value.image = null;
  removeImageFlag.value = true;
}

function resetForm() {
  form.value = { ...originalForm.value };
  newImage.value = null;
  previewUrl.value = null;
  removeImageFlag.value = false;

  if (singleMading.value?.image) {
    currentImageUrl.value = singleMading.value.image.startsWith("http")
      ? singleMading.value.image
      : `${apiUrl}/${singleMading.value.image}`;
  }
}

async function submitForm() {
  try {
    updateLoading.value = true;

    const data = new FormData();
    data.append("title", form.value.title);
    data.append("type", form.value.type);
    data.append("content", form.value.content);

    if (newImage.value) {
      data.append("image", newImage.value);
    } else if (removeImageFlag.value) {
      data.append("image", "");
    }

    data.append("_method", "PUT");

    await updateMading(data, Number(id));

    alert("Mading berhasil diupdate!");
    navigateTo("/mading/list-mading");
  } catch (err) {
    console.error("Gagal mengupdate mading:", err);
    alert("Terjadi kesalahan saat mengupdate mading.");
  } finally {
    updateLoading.value = false;
  }
}
</script>
