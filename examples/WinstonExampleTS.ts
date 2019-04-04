import * as winston from "winston";
import LoggerFactory, { LoggerContext } from "../src";
import { Logger } from "../src/decorators/Logger";
import { ILogger } from "../src/types";

const winstonLogger = winston.createLogger(
    winston.createLogger({
        level: "silly",
        exitOnError: false,
        transports: [new winston.transports.Console()]
    })
);

LoggerContext.add(winstonLogger);
const logger = LoggerFactory.getLogger<winston.Logger>();
logger.verbose(`Hello World`);

class MyClass {
    @Logger()
    private logger!: winston.Logger;

    public sayHello(name: string) {
        this.logger.verbose(
            `hello ${name}, this is not recommended way since this makes your code tightly coupled with winston`
        );
    }
}

const myClass = new MyClass();
myClass.sayHello(`decorator`);

const customLevelWinston = winston.createLogger({
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

LoggerContext.add(customLevelWinston);
const iLogger = LoggerFactory.getLogger<ILogger>();

iLogger.trace(`now its better`);

/* tslint:disable:max-classes-per-file */
class MyUpperClass {
    @Logger()
    private logger!: ILogger;

    public sayHello(name: string) {
        this.logger.trace(`hello ${name}, never been beter!`);
    }
}

const myUpperClass = new MyUpperClass();
myUpperClass.sayHello(`universe`);
