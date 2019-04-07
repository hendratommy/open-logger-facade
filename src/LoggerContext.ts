import { INamedLoggers, IConfigureOptions } from "./types";
import { EmptyLogger } from "./EmptyLogger";

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

    public static configure(options: IConfigureOptions) {
        const instance = LoggerContext.getInstance();
        if (options.hasOwnProperty("useEmptyLogger")) {
            instance.useEmptyLogger = options.useEmptyLogger!;
        }
        options.loggers.forEach((logger) => {
            instance.addLogger(logger.logger, logger.name);
        });
    }

    private static instance: LoggerContext;
    private loggers: INamedLoggers;
    private emptyLogger: EmptyLogger;
    private useEmptyLogger: boolean;
    private constructor() {
        this.loggers = {};
        this.useEmptyLogger = true;
        this.emptyLogger = new EmptyLogger();
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
        const logger = this.loggers[loggerName ? loggerName : "root"];
        if (!logger && this.useEmptyLogger) {
            return this.emptyLogger;
        }
        return logger;
    }
}
