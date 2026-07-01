import { logger } from "../utils/logger.js";

const ErrorMiddleware = (err, req, res, next) => {
  if(!err){
    next()
  }
  // Default to 500 if status code not set
  const statusCode = err.statusCode || err.status || err.code || 500;
  // Use error message or generic fallback
  const message = err.message || 'Internal Server Error';

  // Log the error for debugging (optional, can be removed in production)
  logger.error(err);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
};

export default ErrorMiddleware;
