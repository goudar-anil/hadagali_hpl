import { NextResponse } from "next/server";
import { ApiError } from "./api-error";

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
}

interface ApiSuccess<T> {
  success: true;
  data: T;
  meta: ApiMeta | null;
}

interface ApiFailure {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: null;
}

export function successResponse<T>(
  data: T,
  status = 200,
  meta: ApiMeta | null = null,
) {
  const body: ApiSuccess<T> = {
    success: true,
    data,
    meta,
  };

  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

export function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    const body: ApiFailure = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        ...(error.details !== undefined && {
          details: error.details,
        }),
      },
      meta: null,
    };

    return NextResponse.json(body, {
      status: error.statusCode,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  // Log internal errors, but never expose database or server details.
  console.error("Unexpected API error:", error);

  const body: ApiFailure = {
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
    meta: null,
  };

  return NextResponse.json(body, {
    status: 500,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}