import type { Guru } from "~/types/main.type";

export const UseTeacher = () => {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const guru = ref<Guru[]>([]);

  const { getToken } = UseStorage();
  const token = getToken();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const fetchGuru = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<Guru[]>(`${apiUrl}/api/v1/teacher/showAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      guru.value = res;
    } catch (err: any) {
      console.error("Gagal mengambil data guru:", err);
      error.value = err?.data?.error || err.message;
    } finally {
      loading.value = false;
    }
  };

  const CreateGuru = async (form: {
    nig: string;
    full_name: string;
    position: string;
    subject: string;
    description: string;
    photo: File | null;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      const formData = new FormData();
      formData.append("nig", form.nig);
      formData.append("full_name", form.full_name);
      formData.append("position", form.position);
      formData.append("subject", form.subject);
      formData.append("description", form.description);
      if (form.photo) {
        formData.append("file_path", form.photo);
      } else {
        throw new Error("File gambar wajib diisi");
      }

      const res = await $fetch(`${apiUrl}/api/v1/teacher/create`, {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err: any) {
      console.error("Gagal menambah guru:", err);
      error.value = err?.data?.error || err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchGuruById = async (id: number) => {
    loading.value = true;
    try {
      const res = await $fetch<Guru>(`${apiUrl}/api/v1/teacher/show/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateGuru = async (
    id: number,
    form: {
      nig: string;
      full_name: string;
      position: string;
      subject: string;
      description: string;
      photo?: File | null;
    }
  ) => {
    loading.value = true;
    try {
      const formData = new FormData();
      formData.append("nig", form.nig);
      formData.append("full_name", form.full_name);
      formData.append("position", form.position);
      formData.append("subject", form.subject);
      formData.append("description", form.description);
      if (form.photo) formData.append("photo", form.photo);

      const res = await $fetch(`${apiUrl}/api/v1/teacher/edit/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      return res;
    } catch (err: any) {
      console.error("Gagal update guru:", err);
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    guru,
    fetchGuru,
    loading,
    error,
    CreateGuru,
    fetchGuruById,
    updateGuru
  };
};
