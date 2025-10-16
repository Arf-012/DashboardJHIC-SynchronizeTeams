import type { Mading, MadingForm } from "~/types/main.type";

export const UseMading = () => {
  const { getToken } = UseStorage();
  const token = getToken();
  const apiUrl = useRuntimeConfig().public.apiBase;

  const loading = ref(false);
  const error = ref<string | null>(null);

  const mading: Ref<Mading[]> = ref([]);
  const filterVisibility = ref<'all' | 'public' | 'private'>('all')

  const createMading = async (form: MadingForm) => {
    loading.value = true;
    error.value = null;

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("start_date", form.start_date);
    formData.append("end_date", form.end_date);
    formData.append("location", form.location);
    formData.append("organizer", form.organizer);
    formData.append('visibility', form.visibility)
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
    }
  };

  const FetchAllMading = async () => {
    try {
      const res = await $fetch<Mading[]>(
        `${apiUrl}/api/v1/event/showAll`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      mading.value = res;
    } catch (error) {
      console.error("Error fetch News", error);
    }
  };

    const filteredMading = computed(() => {
    if (filterVisibility.value === 'all') return mading.value
    return mading.value.filter(
      (item) => item.visibility === filterVisibility.value
    )
  })

  const setVisibilityFilter = (val: 'all' | 'public' | 'private') => {
    filterVisibility.value = val
  }

  return { createMading, loading, error, FetchAllMading, mading, setVisibilityFilter, filteredMading, filterVisibility};
};
