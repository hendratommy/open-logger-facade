import { ILogger } from "./types";

export class LoggerContext {
    public static getInstance() {
        if (!LoggerContext.instance) {
            LoggerContext.instance = new LoggerContext();
        }
        return LoggerContext.instance;
    }

    public static use(loggerImpl: ILogger) {
        LoggerContext.getInstance().setLogger(loggerImpl);
    }
    private static instance: LoggerContext;
    private logger?: ILogger;
    private constructor() {}

    public setLogger(logger: ILogger) {
        this.logger = logger;
    }
    public getLogger<T extends ILogger>() {
        return this.logger as T;
    }
}
