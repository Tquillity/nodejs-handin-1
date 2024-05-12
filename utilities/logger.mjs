import {createLogger, format, transports} from 'winston';

const { combine, timestamp, label, printf } = format;

const logFormat = printf(({level, message, timestamp}) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: 'combined.log' }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'operations.log', level: 'info'})
  ]
});

export default logger;