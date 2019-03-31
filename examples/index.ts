import "reflect-metadata";
import * as Pino from "pino";
import { createWinstonLogger } from "../test/test-helper";
import { LoggerContext, LoggerFactory } from "../src";
import { ILogger } from "../src/types";
import { MyClass } from "./MyClass";

const pino = Pino({ level: "trace" });
const winston = createWinstonLogger({ level: "trace" });

LoggerContext.use(winston);
let logger = LoggerFactory.getLogger<ILogger>();
logger.fatal(`fatal using winston`);
logger.error(`error using winston`);
logger.warn(`warn using winston`);
logger.info(`info using winston`);
logger.debug(`debug using winston`);

LoggerContext.use(pino);
logger = LoggerFactory.getLogger();
logger.fatal(`fatal using pino`);
logger.error(`error using pino`);
logger.warn(`warn using pino`);
logger.info(`info using pino`);
logger.debug(`debug using pino`);

const myclass = new MyClass();
myclass.handleLog(`info`, `Logger is injected!`);
