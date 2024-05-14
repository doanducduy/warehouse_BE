class AppError extends Error {
  constructor(statusCode, description, isOperational = true) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }

  isTrustedError() {
    return this.isOperational;
  }
}

module.exports = AppError;
