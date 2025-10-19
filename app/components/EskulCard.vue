<template>
  <div
    class="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border border-secondary-red flex flex-col transform hover:-translate-y-2 relative"
  >
    <div class="absolute top-3 right-3 z-10">
      <span
        class="px-2 py-1 text-xs font-semibold rounded-full bg-secondary-red text-white shadow-md"
      >
        Aktif
      </span>
    </div>

    <div
      class="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>

      <img
        v-if="image"
        :src="image"
        alt="Eskul Image"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        v-else
        class="w-full h-full flex flex-col items-center justify-center text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-12 w-12 mb-2 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span class="text-sm">Tidak ada gambar</span>
      </div>
    </div>

    <div class="flex flex-col flex-1 p-5 gap-3">
      <div>
        <h3
          class="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-secondary-red transition-colors"
        >
          {{ name }}
        </h3>
        <p class="text-gray-600 mt-2 line-clamp-2">
          {{ truncateText(description, 100) }}
        </p>
      </div>

      <div
        class="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-full bg-secondary-red flex items-center justify-center text-white text-xs font-bold"
          >
            {{ pembinaName ? pembinaName.charAt(0) : "?" }}
          </div>
          <div>
            <p class="text-sm font-medium text-gray-700">
              {{ pembinaName || "Tidak ada pembina" }}
            </p>
            <p class="text-xs text-gray-500">Pembina</p>
          </div>
        </div>

        <!-- ⚙️ Tombol Aksi -->
        <div
          class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            @click="$emit('edit', id)"
            class="p-2 text-white bg-secondary-red hover:to-secondary-red/50 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            title="Edit"
          >
            <UIcon
              name="i-lucide-pencil"
              class="size-4 text-white mx-auto"
            />
          </button>
          <button
            @click="$emit('delete', id)"
            class="p-2 text-white bg-secondary-red hover:to-secondary-red/50 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            title="Hapus"
          >
            <UIcon
              name="i-lucide-trash"
              class="size-4 text-white mx-auto"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number;
  name: string;
  description: string;
  image?: string;
  pembinaName?: string;
}>();

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";

  const plainText = text.replace(/<[^>]+>/g, "");

  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + "...";
};


defineEmits(["edit", "delete"]);
</script>
