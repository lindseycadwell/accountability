import winston from 'winston';
import dayjs from 'dayjs';

const dateFormat = () => {
  //return new Date(Date.now()).toUTCString();
  //return dayjs().format('LTS L');
  return dayjs().format('HH:MM:ss : MM/DD/YYYY');
};

class LoggerService {
  constructor(route) {
    this.log_data = null;
    this.route = route;
    const logger = winston.createLogger({
      transports: [new winston.transports.Console()],
      format: winston.format.printf((info) => {
        let message = `\n at: ${dateFormat()} | ${info.level.toUpperCase()}\n ${route}.log \n ${
          info.message
        } | `;
        message = info.obj
          ? message + `data:${JSON.stringify(info.obj)} | `
          : message;
        message = this.log_data
          ? message + `log_data:${JSON.stringify(this.log_data)} | `
          : message;
        return message;
      })
    });
    this.logger = logger;
  }
  setLogData(log_data) {
    this.log_data = log_data;
  }
  async info(message) {
    this.logger.log('info', message);
  }
  async info(message, obj) {
    this.logger.log('info', message, {
      obj
    });
  }
  async debug(message) {
    this.logger.log('debug', message);
  }
  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj
    });
  }
  async error(message) {
    this.logger.log('error', message);
  }
  async error(message, obj) {
    this.logger.log('error', message, {
      obj
    });
  }
}
export default LoggerService;
