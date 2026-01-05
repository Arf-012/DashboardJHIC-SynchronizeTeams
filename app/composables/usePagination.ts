export const usePagination = <T>(data: Ref<T[]>, itemsPerPage: number = 8) => {
  const currentPage = ref(1);

  const totalPages = computed(() =>
    Math.ceil(data.value.length / itemsPerPage)
  );

  const paginatedData = computed(() => {
    if (!Array.isArray(data.value)) return [];
    const start = (currentPage.value - 1) * itemsPerPage;
    return data.value.slice(start, start + itemsPerPage);
  });

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  return {
    currentPage,
    totalPages,
    paginatedData,
    nextPage,
    prevPage,
    goToPage,
  };
};
