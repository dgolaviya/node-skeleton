/**
 * Creating an object for CustomError
 * @param statusCode
 * @param  {} message error message
 * @param  {} detail custom object if needed
 */
class CustomError extends Error {
  constructor(statusCode, message, detail = {}) {
    super();
    this.statusCode = statusCode || 500;
    this.message = message;
    this.error = detail;
  }
}
export default CustomError;