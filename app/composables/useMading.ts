import type { Mading, MadingForm } from "~/types/main.type";

export const UseMading = () => {
  const { getToken } = UseStorage();
  const token = getToken();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const loading = ref(false);
  const error = ref<string | null>(null);

  const mading: Ref<Mading[]> = ref([]);
  const singleMading = ref<Mading | null>(null);
  const filterVisibility = ref<"all" | "public" | "private">("all");

  const createMading = async (form: MadingForm) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("startdate", form.start_date);
    formData.append("enddate", form.end_date);
    formData.append("location", form.location);
    formData.append("organizer", form.organizer);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await $fetch<Mading>(`${apiUrl}/api/v1/event/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal membuat mading:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const UpdateMading = async (id: number, form: MadingForm) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("startdate", form.start_date);
    formData.append("enddate", form.end_date);
    formData.append("location", form.location);
    formData.append("organizer", form.organizer);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await $fetch<Mading>(`${apiUrl}/api/v1/event/edit/${id}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal mengedit mading:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const FetchAllMading = async () => {
    try {
      const res = await $fetch<Mading[]>(`${apiUrl}/api/v1/event/showAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      mading.value = res;
    } catch (error) {
      console.error("Error fetch mading:", error);
    }
  };

  const FetchMadingById = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<Mading>(`${apiUrl}/api/v1/event/show/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      singleMading.value = res;
      return res;
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal fetch mading by ID:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteMading = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      await $fetch(`${apiUrl}/api/v1/event/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Hapus dari state lokal juga
      mading.value = mading.value.filter((item) => item.id !== id);
    } catch (err: any) {
      error.value = err.message;
      console.error("Gagal menghapus mading:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const changeVisibility = async (
    id: number,
    visibility: "public" | "private"
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append("visibility", visibility);

      const res = await $fetch<Mading>(`${apiUrl}/api/v1/event/change-visibility/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // update data di list biar langsung refleksi di UI
      const index = mading.value.findIndex((m) => m.id === id);
      if (index !== -1 && mading.value[index]) {
        mading.value[index] = {
          ...mading.value[index],
          visibility,
        };
      }

      return res;
    } catch (err: any) {
      console.error("Gagal mengubah visibility:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const filteredMading = computed(() => {
    if (filterVisibility.value === "all") return mading.value;
    return mading.value.filter(
      (item) => item.visibility === filterVisibility.value
    );
  });

  const setVisibilityFilter = (val: "all" | "public" | "private") => {
    filterVisibility.value = val;
  };

  return {
    createMading,
    UpdateMading,
    FetchAllMading,
    FetchMadingById,
    deleteMading,
    changeVisibility,
    loading,
    error,
    mading,
    filteredMading,
    filterVisibility,
    setVisibilityFilter,
  };
};
