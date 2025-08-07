import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { PteroError } from "./error.js";
import { RateLimitManager, RateLimitInfo } from "./rateLimit.js";
import "./types.js"; // Import pro rozšíření Axios typů

export interface ClientOptions {
  enableAutoRetry?: boolean;
  maxRetries?: number;
  baseDelay?: number;
}

// Helper function to convert axios headers to string record
function headersToRecord(headers: any): Record<string, string> {
  const result: Record<string, string> = {};
  
  if (headers) {
    Object.keys(headers).forEach(key => {
      const value = headers[key];
      if (typeof value === 'string') {
        result[key.toLowerCase()] = value;
      } else if (Array.isArray(value) && value.length > 0) {
        result[key.toLowerCase()] = value[0];
      } else if (value != null) {
        result[key.toLowerCase()] = String(value);
      }
    });
  }
  
  return result;
}

export class PteroClient {
  private baseUrl: string;
  private apiKey: string;
  private axiosInstance: AxiosInstance;
  private rateLimitManager: RateLimitManager;

  constructor(baseUrl: string, apiKey: string, options: ClientOptions = {}) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.rateLimitManager = new RateLimitManager(
      options.enableAutoRetry ?? true,
      options.maxRetries ?? 3,
      options.baseDelay ?? 1000
    );

    baseUrl = this.baseUrl.trim().endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;

    baseUrl += "/api";

    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    this.setupErrorHandling();
    this.setupRateLimitHandling();
  }

  private setupErrorHandling(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw PteroError.fromAxiosError(error);
      }
    );
  }

  private setupRateLimitHandling(): void {
    // Request interceptor to check rate limits before making request
    this.axiosInstance.interceptors.request.use(async (config) => {
      const delay = this.rateLimitManager.getRecommendedDelay(true);
      if (delay > 0) {
        console.warn(`Rate limit approaching, waiting ${delay}ms before request`);
        await this.rateLimitManager.sleep(delay);
      }
      return config;
    });

    // Response interceptor to update rate limit info
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.rateLimitManager.updateRateLimit(headersToRecord(response.headers), true);
        return response;
      },
      async (error: AxiosError) => {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'] ? 
            parseInt(error.response.headers['retry-after']) : undefined;
          
          // Let the rate limit manager handle the 429 error
          const config = error.config;
          if (config && !config.metadata?.retryCount) {
            config.metadata = { retryCount: 0 };
          }
          
          const retryCount = config?.metadata?.retryCount || 0;
          const maxRetries = this.rateLimitManager['maxRetries'];
          
          if (retryCount < maxRetries) {
            const delay = this.rateLimitManager.calculateBackoffDelay(retryCount, retryAfter);
            console.warn(`Rate limit exceeded, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
            
            await this.rateLimitManager.sleep(delay);

            if (config && config.metadata) {
              config.metadata.retryCount = retryCount + 1;
              return this.axiosInstance.request(config);
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Gets current rate limit information for client API
   */
  getRateLimit(): RateLimitInfo | undefined {
    return this.rateLimitManager.getRateLimit(true);
  }

  /**
   * Checks if client API is approaching rate limit
   */
  isApproachingRateLimit(): boolean {
    return this.rateLimitManager.isApproachingLimit(true);
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
  private rateLimitManager: RateLimitManager;

  constructor(baseUrl: string, apiKey: string, options: ClientOptions = {}) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.rateLimitManager = new RateLimitManager(
      options.enableAutoRetry ?? true,
      options.maxRetries ?? 3,
      options.baseDelay ?? 1000
    );

    baseUrl = this.baseUrl.trim().endsWith("/")
      ? this.baseUrl.slice(0, -1)
      : this.baseUrl;

    baseUrl += "/api";

    this.axiosInstance = axios.create({
      baseURL: baseUrl,
    });

    this.setupErrorHandling();
    this.setupRateLimitHandling();
  }

  private setupErrorHandling(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        throw PteroError.fromAxiosError(error);
      }
    );
  }

  private setupRateLimitHandling(): void {
    // Request interceptor to check rate limits before making request
    this.axiosInstance.interceptors.request.use(async (config) => {
      const delay = this.rateLimitManager.getRecommendedDelay(false);
      if (delay > 0) {
        console.warn(`Rate limit approaching, waiting ${delay}ms before request`);
        await this.rateLimitManager.sleep(delay);
      }
      return config;
    });

    // Response interceptor to update rate limit info
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        this.rateLimitManager.updateRateLimit(headersToRecord(response.headers), false);
        return response;
      },
      async (error: AxiosError) => {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'] ? 
            parseInt(error.response.headers['retry-after']) : undefined;
          
          const config = error.config;
          if (config && !config.metadata?.retryCount) {
            config.metadata = { retryCount: 0 };
          }
          
          const retryCount = config?.metadata?.retryCount || 0;
          const maxRetries = this.rateLimitManager['maxRetries'];
          
          if (retryCount < maxRetries) {
            const delay = this.rateLimitManager.calculateBackoffDelay(retryCount, retryAfter);
            console.warn(`Rate limit exceeded, retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`);
            
            await this.rateLimitManager.sleep(delay);

            if (config && config.metadata) {
              config.metadata.retryCount = retryCount + 1;
              return this.axiosInstance.request(config);
            }
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Gets current rate limit information for application API
   */
  getRateLimit(): RateLimitInfo | undefined {
    return this.rateLimitManager.getRateLimit(false);
  }

  /**
   * Checks if application API is approaching rate limit
   */
  isApproachingRateLimit(): boolean {
    return this.rateLimitManager.isApproachingLimit(false);
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