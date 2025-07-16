export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  REGISTERED: 201,
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists',
  LOGIN_ERROR: 'Login failed',
  REGISTER_FAILED: 'User registration failed',
};

export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User successfully created',
  REGISTER_SUCCESSFUL: 'User registered successfully',
};

// Reusable response helpers
export const sendResponse = (res: any, statusCode: number, message: string) => {
  return res.status(statusCode).json({ message });
};

export const sendErrorResponse = (res: any, statusCode: number, error: string) => {
  return res.status(statusCode).json({ error });
};

export const jsonResponse = (res: any, payload: any) => {
  return res.status(HTTP_STATUS.OK).json(payload);
};
