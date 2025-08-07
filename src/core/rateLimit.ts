export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
  resetDate: Date;
}

export class RateLimitManager {
  private clientRateLimit?: RateLimitInfo;
  private appRateLimit?: RateLimitInfo;
  
  constructor(
    private enableAutoRetry: boolean = true,
    private maxRetries: number = 3,
    private baseDelay: number = 1000
  ) {}

  /**
   * Updates rate limit information from response headers
   */
  updateRateLimit(headers: Record<string, string>, isClientAPI: boolean = false): void {
    const limit = parseInt(headers['x-ratelimit-limit'] || '240');
    const remaining = parseInt(headers['x-ratelimit-remaining'] || '240');
    const reset = parseInt(headers['x-ratelimit-reset'] || '0');
    
    const rateLimitInfo: RateLimitInfo = {
      limit,
      remaining,
      reset,
      resetDate: new Date(reset * 1000)
    };

    if (isClientAPI) {
      this.clientRateLimit = rateLimitInfo;
    } else {
      this.appRateLimit = rateLimitInfo;
    }
  }

  /**
   * Gets current rate limit info for specified API type
   */
  getRateLimit(isClientAPI: boolean = false): RateLimitInfo | undefined {
    return isClientAPI ? this.clientRateLimit : this.appRateLimit;
  }

  /**
   * Checks if we're approaching rate limit (less than 10% remaining)
   */
  isApproachingLimit(isClientAPI: boolean = false): boolean {
    const rateLimit = this.getRateLimit(isClientAPI);
    if (!rateLimit) return false;
    
    return rateLimit.remaining < (rateLimit.limit * 0.1);
  }

  /**
   * Calculates delay needed before next request if approaching limit
   */
  getRecommendedDelay(isClientAPI: boolean = false): number {
    const rateLimit = this.getRateLimit(isClientAPI);
    if (!rateLimit || !this.isApproachingLimit(isClientAPI)) return 0;

    const now = Date.now();
    const resetTime = rateLimit.reset * 1000;
    const timeUntilReset = resetTime - now;
    
    // If we're very close to limit, wait proportionally
    if (rateLimit.remaining <= 5) {
      return Math.max(timeUntilReset / rateLimit.remaining, 1000);
    }
    
    return 0;
  }

  /**
   * Calculates exponential backoff delay for retry
   */
  calculateBackoffDelay(attempt: number, retryAfter?: number): number {
    if (retryAfter) {
      return retryAfter * 1000; // Convert to milliseconds
    }
    
    return this.baseDelay * Math.pow(2, attempt);
  }

  /**
   * Sleeps for specified duration
   */
  async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}