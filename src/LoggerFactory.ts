import { LoggerContext } from "./LoggerContext";

export class LoggerFactory {
    public static getLogger<T>(loggerName?: string) {
        return LoggerContext.getInstance().getLogger(loggerName) as T;
    }
}
