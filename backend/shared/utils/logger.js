import winston from "winston"

export const logger = winston.createLogger({
  level: 'info', // Lowest severity level to log
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json() // Formats output explicitly as structured data
  ),
  transports: [
    // Output error logs to a standalone file
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Send all logs to a collective file
    new winston.transports.File({ filename: 'combined.log' }),
    // Stream live logs straight to the terminal standard output
    new winston.transports.Console()
  ],
})  