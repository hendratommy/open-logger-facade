import { ILogger } from "./types";

export class Logger implements ILogger {
    private loggerImpl: any;
    public constructor(loggerImpl: any) {
        this.loggerImpl = loggerImpl;
    }

    public fatal(message: any, ...rest: any[]) {
        if (
            this.loggerImpl.fatal &&
            typeof this.loggerImpl.fatal === "function"
        ) {
            this.loggerImpl.fatal(message, ...rest);
        } else {
            throw new TypeError(`Logger doesn't have fatal() method`);
        }
    }
    public error(message: any, ...rest: any[]) {
        if (
            this.loggerImpl.error &&
            typeof this.loggerImpl.error === "function"
        ) {
            this.loggerImpl.error(message, ...rest);
        } else {
            throw new TypeError(`Logger doesn't have error() method`);
        }
    }
    public warn(message: any, ...rest: any[]) {
        if (
            this.loggerImpl.warn &&
            typeof this.loggerImpl.warn === "function"
        ) {
            this.loggerImpl.warn(message, ...rest);
        } else {
            throw new TypeError(`Logger doesn't have warn() method`);
        }
    }
    public info(message: any, ...rest: any[]) {
        if (
            this.loggerImpl.info &&
            typeof this.loggerImpl.info === "function"
        ) {
            this.loggerImpl.info(message, ...rest);
        } else {
            throw new TypeError(`Logger doesn't have info() method`);
        }
    }
    public debug(message: any, ...rest: any[]) {
        if (
            this.loggerImpl.debug &&
            typeof this.loggerImpl.debug === "function"
        ) {
            this.loggerImpl.debug(message, ...rest);
        } else {
            throw new TypeError(`Logger doesn't have debug() method`);
        }
    }
    public trace(message: any, ...rest: any[]) {
        if (
            this.loggerImpl.debug &&
            typeof this.loggerImpl.debug === "function"
        ) {
            this.loggerImpl.trace(message, ...rest);
        } else {
            throw new TypeError(`Logger doesn't have trace() method`);
        }
    }
}
