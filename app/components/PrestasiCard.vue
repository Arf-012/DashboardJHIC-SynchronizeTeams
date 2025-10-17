<template>
  <div
    class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-secondary-red transform hover:-translate-y-2 relative"
  >
    <div
      class="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>

      <img
        v-if="imageUrl"
        :src="imageUrl"
        alt="Achievement image"
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
        <span class="text-sm font-medium">Tidak ada gambar</span>
      </div>
    </div>

    <div class="p-6 space-y-4">
      <div class="space-y-3">
        <h3
          class="text-xl font-bold text-gray-800 group-hover:text-secondary-red transition-colors duration-300 overflow-hidden"
          :title="achievement.title"
        >
          {{ truncateText(achievement.title, 50) }}
        </h3>
        <p
          class="text-gray-600 leading-relaxed overflow-hidden"
          :title="achievement.description"
        >
          {{ truncateText(achievement.description, 100) }}
        </p>
      </div>

      <div class="flex flex-col gap-2 text-sm">
        <div class="flex items-center gap-2 text-gray-500">
          <div
            class="py-2 px-3 text-white bg-secondary-red hover:to-secondary-red/50 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <UIcon name="i-lucide-calendar" class="size-4 text-white mx-auto" />
          </div>
          <span class="font-medium">{{
            formatDate(achievement.achievement_date)
          }}</span>
        </div>

        <!-- Related News -->
        <div
          v-if="achievement.News"
          class="flex items-center gap-2 text-gray-500"
        >
          <div
            class="py-2 px-3 text-white bg-secondary-red hover:to-secondary-red/50 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <UIcon name="i-lucide-newspaper" class="size-4 text-white mx-auto" />
          </div>
          <span class="overflow-hidden" :title="achievement.News.title">
            {{ truncateText(achievement.News.title, 40) }}
          </span>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          @click="$emit('edit', achievement)"
          class="p-2 text-white bg-secondary-red hover:to-secondary-red/50 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          title="Edit"
        >
          <UIcon name="i-lucide-pencil" class="size-4 text-white mx-auto" />
        </button>
        <button
          @click="$emit('delete', achievement)"
          class="p-2 text-white bg-secondary-red hover:to-secondary-red/50 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          title="Hapus"
        >
          <UIcon name="i-lucide-trash" class="size-4 text-white mx-auto" />
        </button>
      </div>
    </div>

    <!-- Corner Accent -->
    <div class="absolute top-0 right-0 w-20 h-20 overflow-hidden">
      <div
        class="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 transform rotate-45 translate-x-6 -translate-y-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Achievement } from "~/types/main.type";

const props = defineProps<{
  achievement: Achievement;
}>();

defineEmits(["edit", "delete"]);

const config = useRuntimeConfig();

const imageUrl = computed(() =>
  typeof props.achievement.image === "string"
    ? `${config.public.apiBase}/${props.achievement.image}`
    : null
);

const formatDate = (date: string) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";

  const plainText = text.replace(/<[^>]+>/g, "");

  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + "...";
};

</script>
