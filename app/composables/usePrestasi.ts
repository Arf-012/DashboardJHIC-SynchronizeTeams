import type { Achievement } from "~/types/main.type";

export const UsePrestasi = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const config = useRuntimeConfig();
  const apiUrl = useRuntimeConfig().public.apiBase

  const prestasi: Ref<Achievement[]> = ref([]);
  const singlePrestasi: Ref<Achievement | null> = ref(null);

  const createPrestasi = async (form: {
    title: string;
    description: string;
    image: File | null;
    achievement_date: string;
    news_id: number;
  }) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("achievement_date", form.achievement_date);
    formData.append("news_id", form.news_id.toString());

    if (form.image) formData.append("image", form.image);

    try {
      const response = await $fetch<Achievement>(
        `${apiUrl}/api/v1/achievement/create`,
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
      console.error("Gagal menyimpan prestasi:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchAllPrestasi = async () => {
    try {
      const res = await $fetch<Achievement[]>(
        `${apiUrl}/api/v1/achievement/showAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      prestasi.value = res || [];

      return res

    } catch (err) {
      console.error("Error fetch prestasi:", err);
    }
  };

  const fetchPrestasiById = async (id: string) => {
    try {
      const res = await $fetch<Achievement>(
        `${config.public.apiBase}/api/v1/achievement/show/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      singlePrestasi.value = res;

      return res;
    } catch (err) {
      console.error("Error fetch prestasi:", err);
    }
  };

  const updatePrestasi = async (
    id: string,
    form: {
      title: string;
      description: string;
      image: File | null;
      achievement_date: string;
      news_id: number;
    }
  ) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("achievement_date", form.achievement_date);
    formData.append("news_id", form.news_id.toString());
    if (form.image) formData.append("image", form.image);

    try {
      const response = await $fetch<Achievement>(
        `${config.public.apiBase}/api/v1/achievement/edit/${id}`,
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
      console.error("Gagal update prestasi:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deletePrestasi = async (id: number) => {
    try {
      await $fetch(`${config.public.apiBase}/api/v1/achievement/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      prestasi.value = prestasi.value.filter((p) => p.id !== id);
    } catch (err) {
      console.error("Gagal hapus prestasi:", err);
    }
  };

  return {
    createPrestasi,
    loading,
    error,
    fetchAllPrestasi,
    prestasi,
    singlePrestasi,
    fetchPrestasiById,
    deletePrestasi,
    updatePrestasi
  };
};
