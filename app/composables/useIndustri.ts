import type { Industri } from "~/types/main.type";

export const UseIndustri = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const { getToken } = UseStorage();
  const token = getToken();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const IndustriList = ref<Industri[]>([])
  const singleIndustri = ref<Industri | null>(null)


  const fetchAllIndustri = async () => {
        try {
          const res = await $fetch<Industri[]>(
            `${apiUrl}/api/v1/industry/showAll`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          IndustriList.value = res;
    
          return res
    
        } catch (err) {
          console.error("Error fetch Industri:", err);
        }
  }

  const createIndustri = async (form: FormData
  ) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await $fetch<Industri>(
        `${apiUrl}/api/v1/industry/create`,
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
      console.error("Gagal menyimpan Industri", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateIndustri = async ( form: FormData , id: number) => {
        try {
      const response = await $fetch<Industri>(
        `${apiUrl}/api/v1/industry/edit/${id}`,
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
      console.error("Gagal menyimpan Industri", err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

    const fetchIndustriById = async (id: string) => {
      loading.value = true;
      try {
        const res = await $fetch<Industri>(
          `${apiUrl}/api/v1/industri/show/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        singleIndustri.value = res;
        return res;
      } catch (err) {
        console.error("Error fetch sertifikat:", err);
        error.value = "Gagal memuat data sertifikat";
      } finally {
        loading.value = false;
      }
    };

  const deleteIndustri = async (id: number) => {
    loading.value = true;
    try {
      await $fetch(`${apiUrl}/api/v1/industry/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      IndustriList.value = IndustriList.value.filter((s) => s.id !== id);
      
      return true;
    } catch (err) {
      console.error("Gagal hapus industri", err);
      error.value = "Gagal menghapus industry";
      throw err;
    } finally {
      loading.value = false;
    }
  };


  return {
    loading,
    error,
    fetchAllIndustri,
    IndustriList,
    createIndustri,
    updateIndustri,
    fetchIndustriById,
    singleIndustri,
    deleteIndustri
  };
};
