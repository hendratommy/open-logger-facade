import { LoggerContext } from "./LoggerContext";
import { ILogger } from "./types";

export class LoggerFactory {
    public static getLogger<T extends ILogger>() {
        return LoggerContext.getInstance().getLogger<T>();
    }
}
