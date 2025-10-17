import { UseStorage } from "~/composables/useStorage";
import type { News } from "~/types/main.type";

export const useBerita = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const config = useRuntimeConfig();

  const news: Ref<News[]> = ref([]);
  const singleNews: Ref<News | null> = ref(null);

  const createBerita = async (form: {
    judul: string;
    isi: string;
    gambar: File | null;
    excerpt: string;
    status: string;
    tags: string[];
  }) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("title", form.judul);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.isi);
    formData.append("status", form.status || "draft");

    if (form.gambar) formData.append("thumbnail", form.gambar);
    form.tags.forEach((tag) => formData.append("tags[]", tag));

    try {
      const response = await $fetch<News>(
        `${config.public.apiBase}/api/v1/news/create`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal menyimpan berita:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const FetchAllBerita = async () => {
    try {
      const res = await $fetch<News[]>(
        `${config.public.apiBase}/api/v1/news/getAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      news.value = res;
    } catch (error) {
      console.error("Error fetch News", error);
    }
  };

  const GetBeritaById = async (id: string) => {
    try {
      const res = await $fetch<any>(
        `${config.public.apiBase}/api/v1/news/get/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const berita = Array.isArray(res) ? res[0] : res;

      singleNews.value = berita;
      return berita;
    } catch (error) {
      console.error("Error fetch News", error);
    }
  };

  const UpdateBerita = async (
    id: string,
    form: {
      judul: string;
      isi: string;
      gambar: File | null;
      excerpt: string;
      status: string;
      tags: string[];
    }
  ) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("title", form.judul);
    formData.append("excerpt", form.excerpt);
    formData.append("content", form.isi);
    formData.append("status", form.status || "draft");

    if (form.gambar) formData.append("thumbnail", form.gambar);

    form.tags.forEach((tag) => formData.append("tags[]", tag));

    try {
      const response = await $fetch<News>(
        `${config.public.apiBase}/api/v1/news/update/${id}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal update berita:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const DeleteBerita = async (id: string | number) => {
  loading.value = true
  error.value = null

  try {
    await $fetch(`${config.public.apiBase}/api/v1/news/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    // Hapus dari state lokal
    news.value = news.value.filter((item) => item.id !== id)
  } catch (err: any) {
    error.value = err.message
    console.error("Gagal menghapus berita:", err)
    throw err
  } finally {
    loading.value = false
  }
}


  return {
    createBerita,
    loading,
    error,
    news,
    FetchAllBerita,
    GetBeritaById,
    UpdateBerita,
    singleNews,
    DeleteBerita
  };
};
