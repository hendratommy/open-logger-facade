import "reflect-metadata";
import * as pino from "pino";
import * as winston from "winston";
import * as log4js from "log4js";
import { LoggerContext, LoggerFactory } from "../src";
import { ILogger } from "../src/types";
import { MyClass } from "./MyClass";

const winstonLogger = winston.createLogger({
    level: "trace",
    exitOnError: false,
    transports: [new winston.transports.Console()],
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        trace: 5
    }
});

log4js.configure({
    appenders: {
        consoleAppender: {
            type: "stdout",
            layout: {
                type: "basic"
            }
        }
    },
    categories: {
        default: {
            appenders: ["consoleAppender"],
            level: "trace"
        }
    }
});

LoggerContext.add(pino({ level: "trace" })); // as root logger
LoggerContext.add(winstonLogger, "winston");
LoggerContext.add(log4js.getLogger("consoleAppender"), "log4js");

let logger = LoggerFactory.getLogger<ILogger>("winston");
logger.fatal(`fatal using winston`);
logger.error(`error using winston`);
logger.warn(`warn using winston`);
logger.info(`info using winston`);
logger.debug(`debug using winston`);

logger = LoggerFactory.getLogger(); // use root logger
logger.fatal(`fatal using pino`);
logger.error(`error using pino`);
logger.warn(`warn using pino`);
logger.info(`info using pino`);
logger.debug(`debug using pino`);

logger = LoggerFactory.getLogger<ILogger>("notexist");
logger.fatal(`fatal using 'notexist', useful for library maker`);
logger.error(`error using 'notexist', useful for library maker`);
logger.warn(`warn using 'notexist', useful for library maker`);
logger.info(`info using 'notexist', useful for library maker`);
logger.debug(`debug using 'notexist', useful for library maker`);

const myclass = new MyClass();
myclass.handleLog(`info`, `Logger is injected!`);

logger = LoggerFactory.getLogger("log4js");
logger.fatal(`fatal using log4js`);
logger.error(`error using log4js`);
logger.warn(`warn using log4js`);
logger.info(`info using log4js`);
logger.debug(`debug using log4js`);
