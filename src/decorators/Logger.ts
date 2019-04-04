import { LoggerFactory } from "../LoggerFactory";
import { ILogger } from "../types";

export function Logger<T extends ILogger>(loggerName?: string) {
    return (target: any, propertyName: string | symbol): any => {
        return {
            get() {
                return LoggerFactory.getLogger(loggerName) as T;
            }
        };
    };
}
