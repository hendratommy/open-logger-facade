export class LoggerContext {
    public static getInstance() {
        if (!LoggerContext.instance) {
            LoggerContext.instance = new LoggerContext();
        }
        return LoggerContext.instance;
    }

    public static use(loggerImpl: any) {
        LoggerContext.getInstance().setLogger(loggerImpl);
    }
    private static instance: LoggerContext;
    private logger?: any;
    private constructor() {}

    public setLogger(logger: any) {
        this.logger = logger;
    }
    public getLogger() {
        return this.logger;
    }
}
