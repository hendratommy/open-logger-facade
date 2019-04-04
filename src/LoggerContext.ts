import { INamedLoggers } from "./types";

export class LoggerContext {
    public static getInstance() {
        if (!LoggerContext.instance) {
            LoggerContext.instance = new LoggerContext();
        }
        return LoggerContext.instance;
    }

    public static add(loggerImpl: any, loggerName?: string) {
        LoggerContext.getInstance().addLogger(loggerImpl, loggerName);
    }
    private static instance: LoggerContext;
    private loggers: INamedLoggers;
    private constructor() {
        this.loggers = {};
    }

    public addLogger(loggerImpl: any, loggerName?: string) {
        if (!loggerName) {
            this.loggers.root = loggerImpl;
        } else {
            if (!this.loggers.root) {
                this.loggers.root = loggerImpl;
            }
            this.loggers[loggerName] = loggerImpl;
        }
    }
    public getLogger(loggerName?: string) {
        return this.loggers[loggerName ? loggerName : "root"];
    }
}
