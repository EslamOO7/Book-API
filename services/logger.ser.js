const winston = require('winston');
const dotenv = require('dotenv');
dotenv.config();

//date + logger level+ msg

// for create date format
const dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
};

// for calling the logger services in controller

class LoggerService {
    constructor(path) {

        this.path = path;

        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf(info=>{
                let message =` ${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | `/*for string*/;
                message = info.obj ? message +`data: ${JSON.stringify(info.obj)} | ` : message;
                return message;
            }),
            // defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.Console(),
                // - Write all logs with importance level of `error` or less to `error.log`
                // - Write all logs with importance level of `info` or less to `combined.log`
                // new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH}/${path}.log` }),
            ],
        });
        this.logger = logger;
    }
    async info(message) {
        this.logger.log('info',message);
    }
    async info(message,obj) {
        this.logger.log('info',message,{obj});
    }
    async warn(message) {
        this.logger.log('warn',message);
    }
    async warn(message,obj) {
        this.logger.log('warn',message,{obj});
    }
    async error(message) {
        this.logger.log('error',message);
    }
    async error(message,obj) {
        this.logger.log('error',message,{obj});
    }
    async debug(message) {
        this.logger.log('debug',message);
    }
    async debug(message,obj) {
        this.logger.log('debug',message,{obj});
    }

}
module.exports = LoggerService;