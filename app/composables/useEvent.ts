import type { Acara } from "~/types/main.type";

export const UseEvent = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const MadingList = ref<Acara[]>([]);
  const singleMading = ref<Acara | null>(null);

  const fetchAllMading = async () => {
    try {
      const res = await $fetch<Acara[]>(`${apiUrl}/api/v1/mading/showAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      MadingList.value = res;

      return res;
    } catch (err) {
      console.error("Error fetch Mading:", err);
    }
  };

  const createMading = async (form: FormData) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<Acara>(`${apiUrl}/api/v1/mading/create`, {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal menyimpan mading", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateMading = async (form: FormData, id: number) => {
    try {
      const response = await $fetch<Acara>(
        `${apiUrl}/api/v1/mading/edit/${id}`,
        {
          method: "POST",
          body: form,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal menyimpan mading", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchMadingById = async (id: number) => {
    loading.value = true;
    try {
      const res = await $fetch<Acara>(`${apiUrl}/api/v1/mading/show/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      singleMading.value = res;
      return res;
    } catch (err) {
      console.error("Error fetch Mading", err);
      error.value = "Gagal memuat data Mading";
    } finally {
      loading.value = false;
    }
  };

  const deleteMading = async (id: number) => {
    loading.value = true;
    try {
      await $fetch(`${apiUrl}/api/v1/mading/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      MadingList.value = MadingList.value.filter((s) => s.id !== id);

      return true;
    } catch (err) {
      console.error("Gagal hapus industri", err);
      error.value = "Gagal menghapus industry";
      throw err;
    } finally {
      loading.value = false;
    }
  };

const changeMadingStatus = async (id: number, newStatus: string) => {
  loading.value = true;
  error.value = null;

  try {
    const formData = new FormData();
    formData.append("status", newStatus);

    const response = await $fetch<Acara>(
      `${apiUrl}/api/v1/mading/change-status/${id}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const index = MadingList.value.findIndex((item) => item.id === id);
    if (index !== -1 && MadingList.value[index]) {
      MadingList.value[index].status = newStatus;
    }

    return response;
  } catch (err: any) {
    error.value = err.message || "Gagal mengubah status mading";
    console.error("Gagal ubah status:", err);
    throw err;
  } finally {
    loading.value = false;
  }
};

  return {
    loading,
    error,
    fetchAllMading,
    MadingList,
    createMading,
    updateMading,
    fetchMadingById,
    singleMading,
    deleteMading,
    changeMadingStatus
  };
};
