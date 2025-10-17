import type { Forum } from "~/types/main.type";

export const UseForum = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const config = useRuntimeConfig();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const forumList = ref<Forum[]>([])
    const singleForum: Ref<Forum | null> = ref(null)

  const fetchAllForum = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await $fetch<Forum[]>(`${apiUrl}/api/v1/forum-section/showAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      forumList.value = data

      return data
    } catch (err: any) {
      error.value = err?.message || "Gagal memuat data forum."
    } finally {
      loading.value = false
    }
  }

  const getForumById = async (id: string) => {
    try {
      const res = await $fetch<Forum>(`${apiUrl}/api/v1/forum/show/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      singleForum.value = res
      return res
    } catch (err) {
      console.error("Error fetch forum:", err)
    }
  }

    const createForum = async (form: {
    name: string
    description: string
    icon: File | null
    is_active?: boolean
  }) => {
    loading.value = true
    error.value = null

    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("description", form.description)
    if (form.icon) formData.append("icon", form.icon)
    if (form.is_active !== undefined) {
      formData.append("is_active", String(form.is_active))
    }

    try {
      const response = await $fetch<Forum>(`${apiUrl}/api/v1/forum-section/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (err: any) {
      error.value = err.message
      console.error("Gagal membuat forum:", err)
      throw err
    } finally {
      loading.value = false
    }
  }

    const updateForum = async (
    id: string,
    form: {
      name: string
      description: string
      icon: File | null
      is_active?: boolean
    }
  ) => {
    loading.value = true
    error.value = null

    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("description", form.description)
    if (form.icon) formData.append("icon", form.icon)
    if (form.is_active !== undefined) {
      formData.append("is_active", String(form.is_active))
    }

    try {
      const response = await $fetch<Forum>(
        `${apiUrl}/api/v1/forum-section/edit/${id}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response
    } catch (err: any) {
      error.value = err.message
      console.error("Gagal update forum:", err)
      throw err
    } finally {
      loading.value = false
    }
  }

    const deleteForum = async (id: number) => {
    try {
      await $fetch(`${apiUrl}/api/v1/forum-section/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      forumList.value = forumList.value.filter((f) => f.id !== id)
    } catch (err) {
      console.error("Gagal hapus forum:", err)
    }
  }

  return {fetchAllForum, forumList, loading, error, getForumById, createForum, singleForum, updateForum, deleteForum};
};
