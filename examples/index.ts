import "reflect-metadata";
import * as pino from "pino";
import * as winston from "winston";
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

LoggerContext.use(winstonLogger);
let logger = LoggerFactory.getLogger<ILogger>();
logger.fatal(`fatal using winston`);
logger.error(`error using winston`);
logger.warn(`warn using winston`);
logger.info(`info using winston`);
logger.debug(`debug using winston`);

LoggerContext.use(pino({ level: "trace" }));
logger = LoggerFactory.getLogger();
logger.fatal(`fatal using pino`);
logger.error(`error using pino`);
logger.warn(`warn using pino`);
logger.info(`info using pino`);
logger.debug(`debug using pino`);

const myclass = new MyClass();
myclass.handleLog(`info`, `Logger is injected!`);
