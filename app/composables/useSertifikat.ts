
import type { Sertifikat } from "~/types/main.type";

export const useSertifikat = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const config = useRuntimeConfig();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const sertifikat: Ref<Sertifikat[]> = ref([]);
  const singleSertifikat: Ref<Sertifikat | null> = ref(null);

const createSertifikat = async (form: FormData) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch<Sertifikat>(
      `${apiUrl}/api/v1/certification/create`,
      {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      sertifikat.value.unshift(response);
    }

    return response;
  } catch (err: any) {
    error.value = err.message;
    console.error("Gagal menyimpan sertifikat:", err);
    throw err;
  } finally {
    loading.value = false;
  }
};


const updateSertifikat = async (id: string, formData: FormData) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch<Sertifikat>(
      `${apiUrl}/api/v1/certification/edit/${id}`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Update list sertifikat
    if (response) {
      const index = sertifikat.value.findIndex(s => s.id === response.id);
      if (index !== -1) {
        sertifikat.value[index] = response;
      } else {
        sertifikat.value.unshift(response);
      }
    }

    return response;
  } catch (err: any) {
    error.value = err.message;
    console.error("Gagal Update sertifikat:", err);
    throw err;
  } finally {
    loading.value = false;
  }
};



  const fetchAllSertifikat = async () => {
    loading.value = true;
    try {
      const res = await $fetch<Sertifikat[]>(
        `${apiUrl}/api/v1/certification/showAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      sertifikat.value = res;
      return res;
    } catch (err) {
      console.error("Error fetch sertifikat:", err);
      error.value = "Gagal memuat data sertifikat";
    } finally {
      loading.value = false;
    }
  };

  const fetchSertifikatById = async (id: string) => {
    loading.value = true;
    try {
      const res = await $fetch<Sertifikat>(
        `${config.public.apiBase}/api/v1/certification/show/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      singleSertifikat.value = res;
      return res;
    } catch (err) {
      console.error("Error fetch sertifikat:", err);
      error.value = "Gagal memuat data sertifikat";
    } finally {
      loading.value = false;
    }
  };

  // const updateSertifikat = async (
  //   id: string,
  //   form: {
  //     name: string;
  //     description: string;
  //     logo: File | null;
  //     website: string;
  //   }
  // ) => {
  //   loading.value = true;
  //   error.value = null;

  //   const formData = new FormData();
  //   formData.append("name", form.name);
  //   formData.append("description", form.description);
  //   formData.append("website", form.website);
    
  //   // Gunkan _method untuk PUT/PATCH jika backend membutuhkan
  //   formData.append("_method", "PUT");

  //   if (form.logo) formData.append("logo", form.logo);

  //   try {
  //     const response = await $fetch<Sertifikat>(
  //       `${config.public.apiBase}/api/v1/certification/edit/${id}`,
  //       {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // Update data di list
  //     if (response) {
  //       const index = sertifikat.value.findIndex(s => s.id === parseInt(id));
  //       if (index !== -1) {
  //         sertifikat.value[index] = response;
  //       }
  //     }

  //     return response;
  //   } catch (err: any) {
  //     error.value = err.message;
  //     console.error("Gagal update sertifikat:", err);
  //     throw err;
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  const deleteSertifikat = async (id: number) => {
    loading.value = true;
    try {
      await $fetch(`${config.public.apiBase}/api/v1/certification/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      sertifikat.value = sertifikat.value.filter((s) => s.id !== id);
      
      return true;
    } catch (err) {
      console.error("Gagal hapus sertifikat:", err);
      error.value = "Gagal menghapus sertifikat";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    createSertifikat,
    loading,
    error,
    fetchAllSertifikat,
    sertifikat,
    singleSertifikat,
    fetchSertifikatById,
    deleteSertifikat,
    updateSertifikat
  };
};