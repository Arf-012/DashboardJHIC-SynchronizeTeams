
import type { Sertifikat, Testimonial } from "~/types/main.type";

export const useTestimoni = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const config = useRuntimeConfig();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const testimoni: Ref<Testimonial[]> = ref([]);
  const singleTestimoni: Ref<Testimonial | null> = ref(null);

const createTestimoni = async (form: FormData) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch<Testimonial>(
      `${apiUrl}/api/v1/testimonial/create`,
      {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      testimoni.value.unshift(response);
    }

    return response;
  } catch (err: any) {
    error.value = err.message;
    console.error("Gagal menyimpan testimoni", err);
    throw err;
  } finally {
    loading.value = false;
  }
};


const updateTestimoni = async (id: string, formData: FormData) => {
  loading.value = true;
  error.value = null;

  try {
    const response = await $fetch<Testimonial>(
      `${apiUrl}/api/v1/testimonial/edit/${id}`,
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
      const index = testimoni.value.findIndex(s => s.id === response.id);
      if (index !== -1) {
        testimoni.value[index] = response;
      } else {
        testimoni.value.unshift(response);
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



  const fetchAllTestimoni = async () => {
    loading.value = true;
    try {
      const res = await $fetch<Testimonial[]>(
        `${apiUrl}/api/v1/testimonial/showAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      testimoni.value = res;
      return res;
    } catch (err) {
      console.error("Error fetch sertifikat:", err);
      error.value = "Gagal memuat data sertifikat";
    } finally {
      loading.value = false;
    }
  };

  const fetchTestimoniById = async (id: string) => {
    loading.value = true;
    try {
      const res = await $fetch<Testimonial>(
        `${config.public.apiBase}/api/v1/testimonial/show/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      singleTestimoni.value = res;
      return res;
    } catch (err) {
      console.error("Error fetch sertifikat:", err);
      error.value = "Gagal memuat data sertifikat";
    } finally {
      loading.value = false;
    }
  };

  const deleteTestimoni = async (id: number) => {
    loading.value = true;
    try {
      await $fetch(`${config.public.apiBase}/api/v1/testimonial/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      testimoni.value = testimoni.value.filter((s) => s.id !== id);
      
      return true;
    } catch (err) {
      console.error("Gagal hapus sertifikat:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    createTestimoni,
    loading,
    error,
    fetchAllTestimoni,
    testimoni,
    singleTestimoni,
    fetchTestimoniById,
    deleteTestimoni,
    updateTestimoni
  };
};