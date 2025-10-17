<template>
  <div class="p-8 flex flex-col gap-8">
    <div class="w-full flex justify-between">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Edit Prestasi</h2>
      <NuxtLink to="/prestasi/list-prestasi">
        <button
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Cancel
        </button>
      </NuxtLink>
    </div>

    <div class="space-y-5 p-4 border rounded-md shadow-md border-secondary-red">
      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Judul Prestasi</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul prestasi..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Gambar Prestasi</label>
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="mt-1 block w-full text-sm border rounded-md cursor-pointer focus:outline-none p-1"
        />

        <!-- Preview Gambar Lama / Baru -->
        <div v-if="previewUrl" class="mt-3">
          <img :src="previewUrl" alt="Preview" class="w-full h-48 object-cover rounded-md" />
        </div>
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Deskripsi</label>
        <RichTextEditor
          v-model="form.description"
          rows="4"
          placeholder="Tulis deskripsi singkat prestasi..."
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Tanggal Prestasi</label>
        <input
          v-model="form.achievement_date"
          type="date"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
          required
        />
      </div>

      <div class="p-4">
        <label class="block text-sm font-medium text-primary-gray">Berita Terkait</label>
        <select
          v-model="form.news_id"
          class="mt-1 block w-full rounded-md border-gray-300 outline-2 outline-secondary-red p-2"
        >
          <option disabled value="">Pilih berita terkait</option>
          <option
            v-for="newsItem in news"
            :key="newsItem.id"
            :value="newsItem.id"
          >
            {{ newsItem.title }}
          </option>
        </select>
      </div>

      <div class="flex justify-end p-4">
        <button
          @click="updateData"
          :disabled="loading"
          class="px-6 py-2 bg-secondary-red hover:bg-secondary-red/50 text-white font-medium rounded-md transition"
        >
          <template v-if="loading">Memproses...</template>
          <template v-else>Update Prestasi</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const route = useRoute();
const { fetchPrestasiById, updatePrestasi, loading } = UsePrestasi();
const { FetchAllBerita, news } = useBerita();
const config = useRuntimeConfig();

const id = ref<number | null>(null);

const form = ref({
  title: "",
  description: "",
  achievement_date: "",
  news_id: "",
  image: null as File | null,
});

const previewUrl = ref<string | null>(null);

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    form.value.image = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

onMounted(async () => {
  await FetchAllBerita();

  id.value = Number(route.params.id);
  if (!id.value) return alert("ID prestasi tidak valid");

  const data = await fetchPrestasiById(String(id.value));

  if (data) {
    form.value.title = data.title;
    form.value.description = data.description;
    form.value.achievement_date = data.achievement_date;
    form.value.news_id = data.news_id?.toString() || "";

    if (data.image) {
      previewUrl.value = `${config.public.apiBase}/${data.image}`;
    }
  }
});

async function updateData() {
  if (!id.value) return alert("ID prestasi tidak ditemukan");

  try {
    const payload = {
      title: form.value.title,
      description: form.value.description,
      achievement_date: form.value.achievement_date,
      news_id: Number(form.value.news_id),
      image: form.value.image,
    };

    await updatePrestasi(String(id.value), payload);

    alert("Prestasi berhasil diperbarui!");
    navigateTo("/prestasi/list-prestasi");
  } catch (err) {
    console.error("Gagal memperbarui prestasi:", err);
    alert("Gagal memperbarui data. Periksa kembali input.");
  }
}
</script>

