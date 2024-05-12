import logger from '../utilities/logger.mjs';

function logRequests(req, res, next) {
  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = function(chunk) {
    chunks.push(Buffer.from(chunk));
    return oldWrite.apply(res, arguments);
  };

  res.end = function(chunk) {
    if (chunk) chunks.push(Buffer.from(chunk));
    const body = Buffer.concat(chunks).toString('utf8');

    if(res.statusCode >= 200 && res.statusCode < 300) {
      logger.info(`${req.method} ${req.url} ${res.statusCode} - ${body}`);
    }
    
    oldEnd.apply(res, arguments);
  };

  next();
}

export default logRequests;