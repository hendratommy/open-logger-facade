import { LoggerFactory } from "../LoggerFactory";

export function Logger() {
    return (target: any, propertyName: string | symbol): any => {
        return {
            get() {
                return LoggerFactory.getLogger();
            }
        };
    };
}
