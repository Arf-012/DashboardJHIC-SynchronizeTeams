<template>
  <div class="p-8 flex flex-col gap-8">
    <!-- Header -->
    <div class="w-full flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Edit Portal</h2>
      <NuxtLink to="/portal/list-portal">
        <button class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 rounded-md">
          Cancel
        </button>
      </NuxtLink>
    </div>

    <!-- Form -->
    <div v-if="!loading && form" class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <!-- Nama Portal -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Nama Portal</label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Masukkan nama portal..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- Deskripsi Portal -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <textarea
          v-model="form.description"
          placeholder="Tulis deskripsi portal..."
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        ></textarea>
      </div>

      <!-- URL Portal -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">URL Portal</label>
        <input
          v-model="form.url"
          type="text"
          placeholder="Masukkan URL portal..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- Logo Portal -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Logo Portal</label>
        
        <!-- Preview Logo Saat Ini -->
        <div v-if="currentLogoUrl && !newLogo" class="mt-3 mb-4">
          <p class="text-sm text-gray-600 mb-2">Logo saat ini:</p>
          <img
            :src="currentLogoUrl"
            alt="Logo Saat Ini"
            class="w-48 h-48 object-cover rounded-md border"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <!-- Preview Logo Baru -->
        <div v-if="previewUrl" class="mt-3">
          <p class="text-sm text-gray-600 mb-2">Preview logo baru:</p>
          <img
            v-if="isImage"
            :src="previewUrl"
            alt="Preview Logo Baru"
            class="w-48 h-48 object-cover rounded-md border"
          />
        </div>

        <!-- Tombol Hapus Logo -->
        <button
          v-if="currentLogoUrl"
          @click="removeCurrentLogo"
          type="button"
          class="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
        >
          Hapus Logo Saat Ini
        </button>
      </div>

      <!-- Kategori Portal -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Kategori</label>
        <input
          v-model="form.category"
          type="text"
          placeholder="Masukkan kategori portal..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- SSO & Status Aktif -->
      <div class="p-4 flex gap-4 items-center">
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="form.is_sso_enabled" class="h-4 w-4" />
          Aktifkan SSO
        </label>
        <label class="flex items-center gap-2">
          <input type="checkbox" v-model="form.is_active" class="h-4 w-4" />
          Portal Aktif
        </label>
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
          <template v-else>Update Portal</template>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-pulse text-gray-500">Memuat data portal...</div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { navigateTo, useRoute } from "#imports";

const route = useRoute();
const { id } = route.params;

interface PortalForm {
  name: string;
  description: string;
  url: string;
  logo: File | null;
  category: string;
  is_sso_enabled: boolean;
  is_active: boolean;
}

const { 
  singlePortal,
  fetchPortalById,
  updatePortal,
  loading,
  error
} = UsePortal();

const form = ref<PortalForm>({
  name: "",
  description: "",
  url: "",
  logo: null,
  category: "",
  is_sso_enabled: false,
  is_active: true,
});

const originalForm = ref<PortalForm>({ ...form.value });

const updateLoading = ref(false);
const previewUrl = ref<string | null>(null);
const isImage = ref(true);
const newLogo = ref<File | null>(null);
const currentLogoUrl = ref<string | null>(null);
const removeLogoFlag = ref(false);

const apiUrl = useRuntimeConfig().public.apiBase;

onMounted(async () => {
  try {
    await fetchPortalById(id as string);

    if (singlePortal.value) {
      const data = singlePortal.value;

      form.value = {
        name: data.name || '',
        description: data.description || '',
        url: data.url || '',
        logo: null,
        category: data.category || '',
        is_sso_enabled: data.is_sso_enabled || false,
        is_active: data.is_active ?? true,
      };

      originalForm.value = { ...form.value };

      // Set current logo URL
      if (data.logo) {
        currentLogoUrl.value = data.logo.startsWith('http')
          ? data.logo
          : `${apiUrl}/${data.logo}`;
      }
    }
  } catch (err) {
    console.error('Gagal memuat data portal:', err);
  }
});

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    newLogo.value = file;
    form.value.logo = file;
    isImage.value = file.type.startsWith("image/");
    previewUrl.value = isImage.value ? URL.createObjectURL(file) : null;
    removeLogoFlag.value = false;
  }
}

function removeCurrentLogo() {
  currentLogoUrl.value = null;
  newLogo.value = null;
  previewUrl.value = null;
  form.value.logo = null;
  removeLogoFlag.value = true;
}

function resetForm() {
  form.value = { ...originalForm.value };
  newLogo.value = null;
  previewUrl.value = null;
  removeLogoFlag.value = false;

  if (singlePortal.value?.logo) {
    currentLogoUrl.value = singlePortal.value.logo.startsWith('http')
      ? singlePortal.value.logo
      : `${apiUrl}/${singlePortal.value.logo}`;
  }
}

async function submitForm() {
  try {
    updateLoading.value = true;

    const data = new FormData();
    data.append("name", form.value.name);
    data.append("description", form.value.description);
    data.append("url", form.value.url);
    data.append("category", form.value.category);
    data.append("is_sso_enabled", form.value.is_sso_enabled ? "true" : "false");
    data.append("is_active", form.value.is_active ? "true" : "false");

    if (newLogo.value) {
      data.append("logo", newLogo.value);
    } else if (removeLogoFlag.value) {
      data.append("logo", ""); // backend handle sebagai hapus logo
    }

    data.append("_method", "PUT");

    await updatePortal(id as string, data);

    alert("Portal berhasil diupdate!");
    navigateTo("/portal/list-portal");
  } catch (err) {
    console.error("Gagal mengupdate portal:", err);
    alert("Terjadi kesalahan saat mengupdate portal.");
  } finally {
    updateLoading.value = false;
  }
}
</script>
