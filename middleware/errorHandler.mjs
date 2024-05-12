import logger from '../utilities/logger.mjs';

function errorHandler(err, req, res, next) {
  // logging error internally
  logger.error(`${err.status || 500} - ${err.message}`);

  // Respond to the client
  res.status(err.status || 500).json({
    success: false,
    error: {
      statusCode: err.status || 500,
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : null
    }
  });
}

export default errorHandler;

