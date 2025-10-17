import type { Eskul, EskulForm } from "~/types/main.type";

export const UseEskul = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const eskulList = ref<Eskul[]>([]);
  const singleEskul = ref<Eskul | null>(null); 

  const FetchAllEskul = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<Eskul[]>(`${apiUrl}/api/v1/eskul/showAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      eskulList.value = res;
    } catch (err: any) {
      console.error("Gagal memuat data eskul:", err);
      error.value = err.message || "Terjadi kesalahan saat memuat data eskul.";
    } finally {
      loading.value = false;
    }
  };

 const createEskul = async (form: EskulForm) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("pembina_id", form.pembina_id);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await $fetch<Eskul>(`${apiUrl}/api/v1/eskul/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err: any) {
      console.error("Gagal membuat eskul:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const FetchEskulById = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<Eskul>(`${apiUrl}/api/v1/eskul/show/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      singleEskul.value = res;
      return res;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal fetch mading by ID:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

   const UpdateEskul = async (id: number, form: EskulForm) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("pembina_id", form.pembina_id);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await $fetch<Eskul>(`${apiUrl}/api/v1/eskul/edit/${id}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res;
    } catch (err: any) {
      console.error("Gagal membuat eskul:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteEskul = async (id: number) => {
    try {
      await $fetch(`${apiUrl}/api/v1/eskul/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      console.error("Gagal hapus foto:", err);
      error.value = err.message;
    }
  };

  return { FetchAllEskul, eskulList, loading, error, createEskul, singleEskul, FetchEskulById, UpdateEskul, deleteEskul };
};
