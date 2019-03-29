import { Logger } from "./Logger";

export class LoggerContext {
    public static getInstance() {
        if (!LoggerContext.instance) {
            LoggerContext.instance = new LoggerContext();
        }
        return LoggerContext.instance;
    }

    public static use(loggerImpl: any) {
        LoggerContext.getInstance().setLogger(new Logger(loggerImpl));
    }
    private static instance: LoggerContext;
    private logger: Logger;
    private constructor() {
        this.logger = new Logger(console);
    }

    public setLogger(logger: Logger) {
        this.logger = logger;
    }
    public getLogger() {
        return this.logger;
    }
}
