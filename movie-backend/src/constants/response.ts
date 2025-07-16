export const httpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const responseMessages = {
  // Success
  USER_CREATED: 'User created successfully',

  // Client Errors
  EMAIL_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  INVALID_PASSWORD: 'Invalid password',

  // Server Errors
  SIGNUP_ERROR: 'Signup error',
  LOGIN_ERROR: 'Login error',
};