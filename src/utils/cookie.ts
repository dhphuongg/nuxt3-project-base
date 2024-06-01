import type { CookieOptions } from "#app";

export function getCookie<T>(key: string, d?: T): T {
  const cookie = d ? useCookie<T>(key, { default: () => d }) : useCookie<T>(key);
  return cookie.value;
}

export function setCookie<T>(key: string, value: T, options?: CookieOptions<T>): void {
  const cookie = useCookie<T>(key, { ...options, readonly: false });
  cookie.value = value;
}

export function removeCookie(key: string): void {
  const cookie = useCookie(key);
  cookie.value = undefined;
}
