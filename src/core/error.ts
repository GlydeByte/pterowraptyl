import { AxiosError } from "axios";
import { Error as PteroErrorData } from "../types/errorObjects.js";

export interface PteroErrorResponse {
  date_issued?: string;
  errors: PteroErrorData[];
}

/**
 * Custom error class for handling Pterodactyl API errors.
 * This class extends the built-in Error class and provides additional
 * properties for error details, status code, and error data.
 * @example
 * ```ts
 * try {
 *  // Some API call that may fail
 * } catch (error) {
 *   if (error instanceof PteroError) {
 *     console.error(`Error Name: ${error.errorName}`);
 *     console.error(`Error Details: ${error.errorDetails}`);
 *     console.error(`Status Code: ${error.statusCode}`);
 *     if (error.errorData) {
 *       console.error(`Error Data: ${JSON.stringify(error.errorData)}`);
 *     }
 *   } else {
 *     console.error("An unexpected error occurred:", error);
 *   }
 * }
 * ```
 *
 */
export class PteroError extends Error {
  public readonly errorName: string;
  public readonly errorDetails: string;
  public readonly statusCode: number;
  public readonly errorData: PteroErrorData | undefined;

  constructor(axiosError: AxiosError<unknown, any>) {
    let errorName = "API Error";
    let errorDetails = "An error occurred while making the request";
    const statusCode = axiosError.response?.status || 500;

    const errorData = axiosError.response?.data as any;

    //console.log("Error Data:", errorData);

    if (errorData?.data?.errors && errorData.data.errors.length > 0) {
      const firstError = errorData.data.errors[0];
      errorName = firstError.code || "Unknown Error";
      errorDetails = firstError.detail || "An unknown error occurred";
    } else if (axiosError.message) {
      errorDetails = axiosError.message;
    }

    super(`${errorName}: ${errorDetails}`);

    this.name = "PteroError";
    this.errorName = errorName;
    this.errorDetails = errorDetails;
    this.statusCode = statusCode;
    this.errorData = errorData;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PteroError);
    }
  }

  static fromAxiosError(axiosError: AxiosError<unknown, any>): PteroError {
    return new PteroError(axiosError);
  }
}
