import { LoggerContext } from "./LoggerContext";

export class LoggerFactory {
    public static getLogger<T>() {
        return LoggerContext.getInstance().getLogger() as T;
    }
}
