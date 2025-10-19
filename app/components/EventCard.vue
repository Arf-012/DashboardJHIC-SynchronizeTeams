<template>
  <div
    class="group rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 bg-primary-white border-2 border-secondary-red cursor-pointer"
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

      <span
        class="text-xs font-semibold px-2 py-1 rounded-md capitalize w-fit"
        :class="visibility === 'public'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'"
      >
        {{ visibility }}
      </span>

      <div class="flex flex-wrap gap-3 mt-2">
        <NuxtLink :to="`/event/edit/${id}`">
          <button
            class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
          >
            Edit
          </button>
        </NuxtLink>

        <button
          @click.stop="handleDelete"
          class="px-4 py-1 bg-secondary-red text-white hover:bg-secondary-red/50 cursor-pointer rounded-md"
        >
          Delete
        </button>

        <button
          @click.stop="handleChangeVisibility"
          class="px-4 py-1 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md transition"
        >
          {{ visibility === 'public' ? 'Make Private' : 'Make Public' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  image: string
  visibility: "public" | "private"
}>()

const emit = defineEmits<{
  (e: "delete", id: number): void
  (e: "change-visibility", id: number, visibility: "public" | "private"): void
}>()

const handleDelete = () => {
  emit("delete", props.id)
}

const handleChangeVisibility = () => {
  const newVisibility = props.visibility === "public" ? "private" : "public"
  emit("change-visibility", props.id, newVisibility)
}
</script>
