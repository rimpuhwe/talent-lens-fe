import type { AxiosError } from "axios";

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "NETWORK"
  | "SERVER"
  | "UNKNOWN"
  | "NOT_IMPLEMENTED";

export class ApiError extends Error {
  readonly status?: number;
  readonly code: ApiErrorCode;
  readonly details?: unknown;

  constructor(
    message: string,
    options: { status?: number; code?: ApiErrorCode; details?: unknown } = {}
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code ?? "UNKNOWN";
    this.details = options.details;
  }
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong") {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

export function parseAxiosError(error: AxiosError<unknown>): ApiError {
  const status = error.response?.status;
  const data = error.response?.data;

  const message =
    (typeof data === "object" &&
      data !== null &&
      ("message" in data
        ? String((data as { message?: string }).message)
        : "Message" in data
          ? String((data as { Message?: string }).Message)
          : undefined)) ||
    error.message ||
    "Request failed";

  let code: ApiErrorCode = "UNKNOWN";
  if (status === 401) code = "UNAUTHORIZED";
  else if (status === 403) code = "FORBIDDEN";
  else if (status === 404) code = "NOT_FOUND";
  else if (status === 422 || status === 400) code = "VALIDATION";
  else if (!status) code = "NETWORK";
  else if (status >= 500) code = "SERVER";

  return new ApiError(message, { status, code, details: data });
}
