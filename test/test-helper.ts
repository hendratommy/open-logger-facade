import * as winston from "winston";

export interface IEnhancedWinstonLogger extends winston.Logger {
    fatal: winston.LeveledLogMethod;
}

export function hookConsole(stream: any, fn: (...args: any) => void) {
    const oldWrite = stream.write;
    stream.write = fn;

    return function unhookConsole() {
        stream.write = oldWrite;
    };
}

export function createWinstonLogger(options?: winston.LoggerOptions) {
    return winston.createLogger({
        level: "trace",
        exitOnError: false,
        transports: [new winston.transports.Console()],
        levels: {
            fatal: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
            trace: 5
        },
        ...options
    });
}
