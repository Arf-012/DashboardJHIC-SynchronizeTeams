export default defineNuxtRouteMiddleware((to) => {
  const { getToken } = UseStorage();
  const token = getToken();

  const publicPages = ["/auth/login"];

  if (!token && !publicPages.includes(to.path)) {
    return navigateTo("/auth/login");
  }

  if (token && publicPages.includes(to.path)) {
    return navigateTo("/");
  }

});
