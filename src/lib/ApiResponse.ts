export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export class ApiResponseUtil {
  static success<T>(message: string, data?: T): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  static error<T>(message: string, error?: any): ApiResponse<T> {
    return {
      success: false,
      message,
      error,
    };
  }
}

