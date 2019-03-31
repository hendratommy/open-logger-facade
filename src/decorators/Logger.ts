import { LoggerFactory } from "../LoggerFactory";

export function Logger<T>() {
    return (target: any, propertyName: string | symbol): any => {
        return {
            get() {
                return LoggerFactory.getLogger() as T;
            }
        };
    };
}
