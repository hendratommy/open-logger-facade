export interface ILogEntry {
    level: string;
    message: string;
    [optionName: string]: any;
}

interface ILeveledLogMethod {
    (message: string): void;
    (message: string, meta: any): void;
    (message: string, ...meta: any[]): void;
    (infoObject: object): void;
}

export interface ILogger {
    fatal: ILeveledLogMethod;
    error: ILeveledLogMethod;
    warn: ILeveledLogMethod;
    info: ILeveledLogMethod;
    debug: ILeveledLogMethod;
    trace: ILeveledLogMethod;
}
