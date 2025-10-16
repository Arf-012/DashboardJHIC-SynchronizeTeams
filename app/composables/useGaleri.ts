import type { GalleryItem } from "~/types/main.type";

export const useUseGaleri = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const gallery = ref<GalleryItem[]>([]);

  const fetchGallery = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch<GalleryItem[]>(
        `${apiUrl}/api/v1/image/showAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      gallery.value = res;
      console.log(res);
    } catch (err: any) {
      console.error("Gagal mengambil galeri:", err);
      error.value = err.message || "Terjadi kesalahan";
    } finally {
      loading.value = false;
    }
  };

  const fetchGalleryByCategory = async (category: string) => {
    loading.value = true;
    error.value = null;
    try {
      const res = await $fetch<GalleryItem[]>(
        `${apiUrl}/api/v1/image/show?category=${category}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      gallery.value = res;
    } catch (err: any) {
      error.value = err.message || "Gagal memuat galeri kategori.";
    } finally {
      loading.value = false;
    }
  };

  const deleteGallery = async (id: number) => {
    try {
      await $fetch(`${apiUrl}/api/v1/image/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      gallery.value = gallery.value.filter((item) => item.ID !== id);
    } catch (err: any) {
      console.error("Gagal hapus foto:", err);
      error.value = err.message;
    }
  };

  const uploadGallery = async (form: {
    category: string;
    title: string;
    file_path: File | null;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append("category", form.category);
      formData.append("title", form.title);

      if (form.file_path) {
        formData.append("file_path", form.file_path);
      } else {
        throw new Error("File gambar wajib diisi");
      }

      const res = await $fetch(`${apiUrl}/api/v1/image/add`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err: any) {
      console.error("Gagal upload gambar:", err);
      error.value = err?.data?.error || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    gallery,
    fetchGallery,
    loading,
    error,
    deleteGallery,
    fetchGalleryByCategory,
    uploadGallery,
  };
};
