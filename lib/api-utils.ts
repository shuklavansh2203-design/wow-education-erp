/**
 * Helper function to get user from request headers
 * Used in API routes after middleware authentication
 */
export function getUserFromHeaders(headers: Headers) {
  return {
    userId: headers.get('x-user-id'),
    email: headers.get('x-user-email'),
    role: headers.get('x-user-role'),
  };
}

/**
 * Helper function to verify user role
 */
export function hasRole(userRole: string, requiredRoles: string[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Helper function to create error response
 */
export function createErrorResponse(message: string, statusCode: number = 400) {
  return {
    success: false,
    error: message,
    statusCode,
  };
}

/**
 * Helper function to create success response
 */
export function createSuccessResponse<T = any>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200
) {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
}