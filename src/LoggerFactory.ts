import { LoggerContext } from "./LoggerContext";

export class LoggerFactory {
    public static getLogger() {
        return LoggerContext.getInstance().getLogger();
    }
}
