export const UseStorage = () => {
  let token: any = ref("");

  const setToken = (token: string) => {
    useCookie("authToken").value = token;
  };

  const getToken = () => {
    token = useCookie("authToken").value;
    return token;
  };

  const removeToken = () => {
    const authToken = useCookie("authToken");
    authToken.value = null;
    navigateTo("/auth/login")
  };

  return { setToken, getToken, removeToken };
};
