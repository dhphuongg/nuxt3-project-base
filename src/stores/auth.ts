import { CookieKey } from "~/constants/cookie-key.constant";
import { pages } from "~/constants/pages.constant";

interface ITokenStore {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): { accessToken: string; refreshToken: string } => ({
    accessToken: getCookie<string>(CookieKey.ACCESS_TOKEN) || "",
    refreshToken: getCookie<string>(CookieKey.REFRESH_TOKEN) || ""
  }),
  getters: { loggedIn: ({ accessToken }): boolean => !!accessToken },
  actions: {
    logIn({ accessToken, refreshToken }: ITokenStore, redirect: boolean = true) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      setCookie<string>(CookieKey.ACCESS_TOKEN, accessToken);
      setCookie<string>(CookieKey.REFRESH_TOKEN, refreshToken);
      if (redirect) navigateTo((useRoute().query.redirect as string) || pages.home.path);
    },
    logOut(options?: { redirect?: string }): void {
      removeCookie(CookieKey.ACCESS_TOKEN);
      removeCookie(CookieKey.REFRESH_TOKEN);
      if (options && options.redirect)
        navigateTo({ path: pages.login.path, query: { redirect: options.redirect } });
      else navigateTo(pages.login.path);
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
