import { UseStorage } from '~/composables/useStorage'
import type { News } from '~/types/main.type'

export const useBerita = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const { getToken } = UseStorage()
  const token = getToken()
  const config = useRuntimeConfig()

  const news: Ref<News[]> = ref([])

  const createBerita = async (form: {
    judul: string
    isi: string
    gambar: File | null
    excerpt: string
    status: string
    tags: string[]
  }) => {
    loading.value = true
    error.value = null

    const formData = new FormData()
    formData.append('title', form.judul)
    formData.append('excerpt', form.excerpt)
    formData.append('content', form.isi)
    formData.append('status', form.status || 'draft')

    if (form.gambar) formData.append('thumbnail', form.gambar)
    form.tags.forEach(tag => formData.append('tags[]', tag))

    try {
      const response = await $fetch<News>(`${config.public.apiBase}/api/v1/news/create`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (err: any) {
      error.value = err.message
      console.error('Gagal menyimpan berita:', err)
      throw err
    } finally {
      loading.value = false
    }
  }
  
  const FetchAllBerita = async () => {
    try {
      const res = await $fetch<News[]>(`${config.public.apiBase}/api/v1/news/getAll`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })

      news.value = res
    } catch (error) {
      
    }
  }

  return { createBerita, loading, error, news, FetchAllBerita }
}
