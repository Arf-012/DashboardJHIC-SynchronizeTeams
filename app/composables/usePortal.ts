
import type { Sertifikat, Portal } from "~/types/main.type";

export const UsePortal = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const config = useRuntimeConfig();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const portal: Ref<Portal[]> = ref([]);
  const singlePortal: Ref<Portal | null> = ref(null);

const createPortal = async (form: FormData) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch<Portal>(
      `${apiUrl}/api/v1/portal/create`,
      {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      portal.value.unshift(response);
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


const updatePortal = async (id: string, formData: FormData) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch<Portal>(
      `${apiUrl}/api/v1/portal/edit/${id}`,
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
      const index = portal.value.findIndex(s => s.id === response.id);
      if (index !== -1) {
        portal.value[index] = response;
      } else {
        portal.value.unshift(response);
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



  const fetchAllPortal = async () => {
    loading.value = true;
    try {
      const res = await $fetch<Portal[]>(
        `${apiUrl}/api/v1/portal/showAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      portal.value = res;
      return res;
    } catch (err) {
      console.error("Error fetch sertifikat:", err);
      error.value = "Gagal memuat data sertifikat";
    } finally {
      loading.value = false;
    }
  };

  const fetchPortalById = async (id: string) => {
    loading.value = true;
    try {
      const res = await $fetch<Portal>(
        `${config.public.apiBase}/api/v1/portal/show/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      singlePortal.value = res;
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

  const deletePortal = async (id: number) => {
    loading.value = true;
    try {
      await $fetch(`${config.public.apiBase}/api/v1/portal/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      portal.value = portal.value.filter((s) => s.id !== id);
      
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
    createPortal,
    loading,
    error,
    fetchAllPortal,
    portal,
    singlePortal,
    fetchPortalById,
    deletePortal,
    updatePortal
  };
};