const ErrorResponse = require('../utils/error-response.utils');
require('colors');

// 400-Bad Request, 404-Not Found, 500-Internal Server Error

const errorHandler = async (err, req, res, next) => {
  let error = { ...err }, errors = {};

  error.message = err.message;

  // Log to console for dev
  console.log(`${err}`.red);

  if (req.originalUrl === '/api/v1/auth/login') {
    Object.entries(req.cookies).forEach(([key, value]) => res.clearCookie(key));
  }

  // custom errors
  if (err.customErrors) {
    errors = err.customErrors;
  }

  // custom errors handled using joi
  if (err.JoiValidationError) {
    err.JoiValidationError.details.forEach(({ path, message }) => errors[path] = message);
    error = new ErrorResponse("Validation Error", 400);
  }

  console.log(`${error.statusCode || 500} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`.cyan.red);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    errors
  });
};

module.exports = errorHandler;
