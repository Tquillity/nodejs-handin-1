function sendResponse(res, statusCode, data, message = '') {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function sendError(res, statusCode, message = '') {
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
}

export { sendResponse, sendError };