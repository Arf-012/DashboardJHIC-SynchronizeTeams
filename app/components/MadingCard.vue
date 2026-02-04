<template>
  <div
    class="relative rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg bg-white"
  >
    <img
      :src="image"
      alt="Mading Image"
      class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <div
      class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white p-3 flex justify-between items-center"
    >
      <div>
        <p class="font-semibold text-lg truncate">{{ title }}</p>
        <p class="text-xs opacity-80 capitalize">{{ type }}</p>
      </div>
      <span
        class="text-xs font-medium px-2 py-1 rounded-md"
        :class="statusColor"
      >
        {{ status }}
      </span>
    </div>

    <div
      class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <button
        @click="$emit('edit', id)"
        class="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition"
        title="Edit"
      >
        Status
        <i class="fas fa-edit"></i>
      </button>
      <button
        @click="$emit('delete', id)"
        class="bg-secondary-red text-white p-2 rounded-md hover:bg-secondary-red/50 transition"
        title="Hapus"
      >
        Hapus
        <i class="fas fa-trash-alt"></i>
      </button>
      <button
        @click="$emit('update', id)"
        class="bg-secondary-red text-white p-2 rounded-md hover:bg-secondary-red/50 transition"
        title="update"
      >
        Edit
        <Icon name="heroicons:pencil-square" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MadingCardProps {
  id: number;
  title: string;
  type: string;
  content: string;
  image: string;
  status: string;
  is_active: boolean;
}

defineProps<MadingCardProps>();
defineEmits(["edit", "delete", "update"]);

const statusColor = computed(() => {
  switch (status.toLowerCase()) {
    case "draft":
      return "bg-gray-600";
    case "published":
      return "bg-green-600";
    default:
      return "bg-blue-600";
  }
});
</script>
