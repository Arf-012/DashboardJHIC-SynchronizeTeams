import type { LoginResponse } from "~/types/main.type";

export const useAuth = () => {
  const { setToken } = UseStorage(); // pastikan ini composable kamu sendiri
  const apiUrl = useRuntimeConfig().public.apiBase;

  const loading = ref(false);
  const error = ref<string | null>(null);

  const login = async (data: { email: string; password: string }) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await $fetch<LoginResponse>(`${apiUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: data,
      });

      setToken(res.token);

      if (res.user.role === "siswa") {
        navigateTo("/");
      } else {
        throw new Error("Unauthorized access: role tidak dikenal");
      }

      console.log("Login sukses:", res);
      return res;
    } catch (err: any) {
      console.error("Login gagal:", err);
      error.value = err?.data?.message || err.message || "Terjadi kesalahan saat login";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    login,
    loading,
    error,
  };
};
