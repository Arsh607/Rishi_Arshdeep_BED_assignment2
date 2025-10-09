export type Status = "success" | "error";
export interface ApiResponse<T> { status: Status; data?: T; message?: string; error?: string; }
export const successResponse = <T>(data?: T, message?: string): ApiResponse<T> => ({ status: "success", data, message });
export const errorResponse = (message: string) => ({
  status: "error",
  error: message
});