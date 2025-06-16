export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  API_ERROR = 'API_ERROR',
  TIMEOUT = 'TIMEOUT',
  NOT_FOUND = 'NOT_FOUND',
  UNKNOWN = 'UNKNOWN'
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: any;
}

export class ApiError extends Error {
  constructor(public code: ErrorCode, message: string, public details?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NetworkError extends ApiError {
  constructor(message: string, details?: any) {
    super(ErrorCode.NETWORK_ERROR, message, details);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends ApiError {
  constructor(message: string, details?: any) {
    super(ErrorCode.TIMEOUT, message, details);
    this.name = 'TimeoutError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string, details?: any) {
    super(ErrorCode.NOT_FOUND, message, details);
    this.name = 'NotFoundError';
  }
}
