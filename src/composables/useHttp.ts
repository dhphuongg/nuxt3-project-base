import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import axios from "axios";

const API_REQUEST_TIMEOUT = 20000; // 20s
const headers = {
  "Content-Type": "application/json",
  "App-Code": "hit-circle"
};

abstract class Http {
  protected readonly instance: AxiosInstance;

  protected constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers,
      timeout: API_REQUEST_TIMEOUT
    });
    this.initializeInterceptor(this.instance);
  }

  private initializeInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use(this.handleRequest, this.handleRequestError);
    instance.interceptors.response.use(this.handleResponse, this.handleResponseError);
  };

  private handleRequest(config: InternalAxiosRequestConfig) {
    if (!config.url?.startsWith("auth")) {
      const authStore = useAuthStore();
      const token = authStore.accessToken;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = useCookieLocale().value;
    return config;
  }

  private handleRequestError = (error: Any) => {
    return Promise.reject(error);
  };

  private handleResponse = (response: AxiosResponse) => {
    return response;
  };

  private async handleResponseError(error: AxiosError) {
    const { config, response } = error;
    if (
      response?.status === undefined ||
      [403, 404, 500, 501, 502, 503, 504].includes(response?.status)
    ) {
      return Promise.reject(error?.response?.data);
    }
    if (response?.status === 401) {
      if (!config?.url?.startsWith("auth")) {
        const authStore = useAuthStore();
        if (authStore.refreshToken) {
          try {
            const res = await axios.post<LoginResponse>(
              "auth/refresh-token",
              {
                refreshToken: authStore.refreshToken
              },
              { baseURL: useRuntimeConfig().public.baseApiUrl + "/api/v1" }
            );
            authStore.logIn(res.data.data, false);
            return new Promise((resolve, reject) => {
              axios
                .request({
                  ...config,
                  headers: {
                    ...config?.headers,
                    Authorization: `Bearer ${res.data.data.accessToken}`
                  }
                })
                .then(async (response) => {
                  resolve(response);
                  await refreshNuxtData();
                })
                .catch((error) => {
                  reject(error);
                });
            });
          } catch (error) {
            console.log(error);
            authStore.logOut({ redirect: useRoute().fullPath });
            // useMessage().error(useNuxtApp().$i18n.t(LanguageKey.UNAUTHORIZED));
          }
        }
      }
    }

    return Promise.reject(error?.response?.data);
  }

  public get = async <T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const response = await this.instance.get<IApiResponse<T>>(url, { params, ...config });
    return response.data.data;
  };

  public post = async <T>(
    url: string,
    data: Any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await this.instance.post<IApiResponse<T>>(url, data, { ...config });
    return response.data.data;
  };

  public put = async <T>(
    url: string,
    data: Any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await this.instance.put<IApiResponse<T>>(url, data, { ...config });
    return response.data.data;
  };

  public patch = async <T>(
    url: string,
    data: Any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> => {
    const response = await this.instance.patch<IApiResponse<T>>(url, data, { ...config });
    return response.data.data;
  };

  public delete = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    const response = await this.instance.delete<IApiResponse<T>>(url, { ...config });
    return response.data.data;
  };
}

class HttpSingleton extends Http {
  public static singleton?: HttpSingleton;
  constructor() {
    const config = useRuntimeConfig();
    super(config.public.baseApiUrl + "/api/v1");
  }
  public static getSingleton() {
    if (!this.singleton) {
      console.log("🔥 get instance again ");
      this.singleton = new HttpSingleton();
    }
    return this.singleton;
  }
}

// const httpInstance = HttpSingleton.getSingleton();

export const useHttp = (): HttpSingleton => HttpSingleton.getSingleton();
