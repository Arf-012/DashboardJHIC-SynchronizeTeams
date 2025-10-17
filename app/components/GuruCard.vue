<template>
  <div
    class="relative rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg cursor-pointer"
    @click="$emit('show-detail')"
  >
    <img
      :src="imageUrl"
      alt="Foto Guru"
      class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <div
      class="absolute bottom-0 left-0 w-full bg-black/60 text-white p-3 flex flex-col justify-between"
    >
      <p class="font-semibold truncate">{{ title || "Tanpa Nama" }}</p>
      <p v-if="subtitle" class="text-sm text-gray-200 truncate">
        {{ subtitle }}
      </p>
    </div>

    <div
      class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <button
        @click.stop="$emit('edit')"
        class="bg-secondary-red text-white p-2 rounded-md hover:bg-secondary-red/50 transition"
        title="Edit"
      >
      Edit
        <i class="fas fa-edit"></i>
      </button>

      <button
        @click.stop="$emit('delete')"
        class="bg-secondary-red text-white p-2 rounded-md hover:bg-secondary-red/50 transition"
        title="Hapus"
      >
      Hapus
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  imageUrl: string;
  title: string;
  subtitle?: string;
}>();

defineEmits(["show-detail", "edit", "delete"]);
</script>
