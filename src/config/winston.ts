import winston from 'winston';
import { nodeEnv, logLevel } from './index';

const { combine, colorize, printf } = winston.format;

const myFormat = printf(({ level, message }) => {
  return `\n   Level: ${level} \n   Message: ${message}`;
});

const myCustomLevels = {
  levels: {
    error: 0,
    info: 1,
    debug: 2
  },
  colors: {
    error: 'red',
    info: 'green',
    debug: 'magenta'
  }
};

winston.addColors(myCustomLevels.colors);

if (nodeEnv === 'development') {
  const logger = winston.createLogger({
    levels: myCustomLevels.levels,
    format: combine(colorize(), myFormat),
    transports: [
      new winston.transports.Console({
        level: logLevel,
        handleExceptions: true
      }),
      new winston.transports.File({ filename: 'combined.log' })
    ],
    exitOnError: false
  });
}

export default logger;
