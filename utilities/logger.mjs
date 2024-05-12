import { createLogger, format, transports } from 'winston';
import path from 'path';
import { fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { combine, timestamp, printf } = format;

const logFormat = printf(({level, message, timestamp}) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.File({ filename: path.join(__dirname, '../logs/combined.log') }),
    new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../logs/operations.log'), level: 'info' })
  ]
});

export default logger;