<template>
  <div
    class="group rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-primary-white border-2 border-secondary-red dark:bg-primary-white cursor-pointer"
    @click="navigateToDetail"
  >
    <div class="relative w-full h-48 overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div class="p-4 flex flex-col gap-3 z-50">
      <h3
        class="text-lg font-semibold text-primary-gray group-hover:text-secondary-red transition-colors duration-200 line-clamp-2"
      >
        {{ title }}
      </h3>
      <div class="flex gap-4">
        <NuxtLink to="/berita/edit-berita"
          ><button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
          >
            Edit
          </button></NuxtLink
        >
        <NuxtLink to=""
          ><button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
          >
            Delete
          </button></NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps<{
  title: string;
  image: string;
  to?: string;
}>();

const router = useRouter();

const navigateToDetail = () => {
  if (props.to) router.push(props.to);
};
</script>
