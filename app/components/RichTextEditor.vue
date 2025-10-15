<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-primary-gray mb-2">
      {{ label }}
    </label>

    <ClientOnly fallback-tag="div" fallback="Loading editor...">
      <QuillEditor
        :content="modelValue"              
        @update:content="onContentChange" 
        theme="snow"
        content-type="html"
        :placeholder="placeholder"
        :toolbar="toolbarOptions"
        class="rounded-md border border-gray-300 outline-2 outline-secondary-red focus-within:ring-2 focus-within:ring-blue-500"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Tulis sesuatu di sini...'
  },
  toolbarOptions: {
    type: Array,
    default: () => [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      [{ color: [] }, { background: [] }],
      ['clean']
    ]
  }
})

const emit = defineEmits(['update:modelValue'])

function onContentChange(newContent) {
  emit('update:modelValue', newContent)
}
</script>

<style scoped>
.ql-container.ql-snow {
  min-height: 300px;
  font-size: 16px;
}

.ql-snow .ql-editor {
  min-height: 300px;
}
</style>
