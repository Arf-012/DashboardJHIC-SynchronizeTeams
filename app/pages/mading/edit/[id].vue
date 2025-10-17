<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">
        {{ isEdit ? "Edit Mading / Event" : "Buat Mading / Event Baru" }}
      </h2>
      <NuxtLink to="/mading/list">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <!-- JUDUL -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Judul Event</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul event..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <!-- GAMBAR -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar Event</label>
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <!-- Gambar lama -->
        <div v-if="!previewUrl && form.imageUrl" class="mt-3">
          <p class="text-sm text-gray-600 mb-1">Gambar Lama:</p>
          <img
            :src="getImageUrl(form.imageUrl)"
            alt="Gambar Lama"
            class="w-full h-48 object-cover rounded-md border"
          />
        </div>

        <!-- Preview gambar baru -->
        <div v-if="previewUrl" class="mt-3">
          <p class="text-sm text-gray-600 mb-1">Preview Gambar Baru:</p>
          <img
            :src="previewUrl"
            alt="Preview"
            class="w-full h-48 object-cover rounded-md border"
          />
        </div>
      </div>

      <!-- DESKRIPSI -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <textarea
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi singkat event..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        ></textarea>
      </div>

      <!-- KATEGORI -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Kategori</label>
        <input
          v-model="form.category"
          type="text"
          placeholder="Masukkan kategori event..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- TANGGAL -->
      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-primary-gray">Tanggal Mulai</label>
          <input
            v-model="form.start_date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-primary-gray">Tanggal Berakhir</label>
          <input
            v-model="form.end_date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          />
        </div>
      </div>

      <!-- LOKASI -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Lokasi</label>
        <input
          v-model="form.location"
          type="text"
          placeholder="Masukkan lokasi event..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- PENYELENGGARA -->
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Penyelenggara</label>
        <input
          v-model="form.organizer"
          type="text"
          placeholder="Masukkan nama penyelenggara..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <!-- SUBMIT BUTTON -->
      <div class="flex justify-end p-4">
        <button
          @click="submitForm"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>{{ isEdit ? "Update Event" : "Simpan Event" }}</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { MadingForm } from "~/types/main.type";
// import type { MadingForm } from "~/types/main.type";

const { createMading, loading, FetchMadingById, UpdateMading } = UseMading();

const route = useRoute();
const router = useRouter();

const isEdit = ref(!!route.params.id);

const form = ref<MadingForm>({
  title: "",
  description: "",
  category: "",
  start_date: "",
  end_date: "",
  location: "",
  organizer: "",
  image: null as File | null,
  imageUrl: "", 
});

const previewUrl = ref<string | null>(null);

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.image = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

const getImageUrl = (path: string) => {
  if (!path) return "/images/default.jpg";
  return path.startsWith("http")
    ? path
    : `https://api-infra.synchronizeteams.my.id/${path}`;
};


onMounted(async () => {
  if (isEdit.value) {
    const id = Number(route.params.id);
    const data = await FetchMadingById(id);

    if (data) {
      form.value.title = data.title;
      form.value.description = data.description;
      form.value.category = data.category;
      form.value.start_date = data.start_date;
      form.value.end_date = data.end_date;
      form.value.location = data.location;
      form.value.organizer = data.organizer;
      form.value.imageUrl = data.image; // pastikan API kirim URL lengkap
    }
  }
});

// Submit Form
async function submitForm() {
  try {
    if (isEdit.value) {
      const id = Number(route.params.id);
      await UpdateMading(id, form.value);
      alert("Event berhasil diperbarui!");
    } else {
      await createMading(form.value);
      alert("Event berhasil disimpan!");
    }

    router.push("/mading/list-mading");
  } catch (err) {
    console.error("Gagal menyimpan event:", err);
    alert("Gagal menyimpan event. Periksa kembali input.");
  }
}
</script>
