import axios, { AxiosError, AxiosInstance } from "axios";
import { PteroError } from "./error.js";

export class PteroClient {
  private baseUrl: string;
  private apiKey: string;

  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;

    baseUrl = this.baseUrl.trim().endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;

    baseUrl += "/api";

    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw PteroError.fromAxiosError(error);
      }
    );
  }

  public http(): Promise<AxiosInstance> {
    if (this.apiKey) {
      try {
        this.axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.apiKey}`;
        this.axiosInstance.defaults.headers.common["Content-Type"] =
          "application/json";
        this.axiosInstance.defaults.headers.common["Accept"] =
          "Application/vnd.pterodactyl.v1+json";
        return Promise.resolve(this.axiosInstance);
      } catch (e) {
        throw new Error("Authentication failed: " + (e as Error).message);
      }
    } else {
      return Promise.reject(new Error("API key is not set."));
    }
  }
}

export class PteroApp {
  private baseUrl: string;
  private apiKey: string;

  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;

    baseUrl = this.baseUrl.trim().endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;

    baseUrl += "/api";

    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw PteroError.fromAxiosError(error);
      }
    );
  }
  public http(): Promise<AxiosInstance> {
    if (this.apiKey) {
      try {
        this.axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${this.apiKey}`;
        this.axiosInstance.defaults.headers.common["Content-Type"] =
          "application/json";
        this.axiosInstance.defaults.headers.common["Accept"] =
          "Application/vnd.pterodactyl.v1+json";
        return Promise.resolve(this.axiosInstance);
      } catch (e) {
        throw new Error("Authentication failed: " + (e as Error).message);
      }
    } else {
      return Promise.reject(new Error("API key is not set."));
    }
  }
}
