<template>
  <div
    class="group rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-white dark:bg-primary-white  cursor-pointer"
    @click="navigateToDetail"
  >
    <div class="relative w-full h-48 overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
      />
      <div class="p-4 absolute bottom-0 z-50">
        <h3
          class="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-secondary-red transition-colors duration-200 line-clamp-2"
        >
          {{ title }}
        </h3>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  image: string
  to?: string
}>()

const router = useRouter()

const navigateToDetail = () => {
  if (props.to) router.push(props.to)
}
</script>
