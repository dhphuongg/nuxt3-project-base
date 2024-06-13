import { pages } from "~/constants/pages.constant";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  if (!authStore.loggedIn)
    return navigateTo({ path: pages.login.path, query: { redirect: to.fullPath } });
});
