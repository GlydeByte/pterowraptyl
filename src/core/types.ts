import { InternalAxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    metadata?: {
      retryCount: number;
    };
  }
}

export interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: {
    retryCount: number;
  };
}