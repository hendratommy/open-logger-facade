import { LoggerFactory } from "../LoggerFactory";
import { ILogger } from "../types";

export function Logger<T extends ILogger>() {
    return (target: any, propertyName: string | symbol): any => {
        return {
            get() {
                return LoggerFactory.getLogger() as T;
            }
        };
    };
}
