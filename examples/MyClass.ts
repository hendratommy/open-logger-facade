import { Logger } from "../src/decorators/Logger";
import { ILogger } from "../src";

export class MyClass {
    @Logger()
    logger!: ILogger;

    handleLog(
        level: "fatal" | "error" | "warn" | "info" | "debug" | "trace",
        message: string
    ) {
        switch (level) {
            case "fatal":
                this.logger.fatal(message);
                break;
            case "error":
                this.logger.error(message);
                break;
            case "warn":
                this.logger.warn(message);
                break;
            case "info":
                this.logger.info(message);
                break;
            case "debug":
                this.logger.debug(message);
                break;
            case "trace":
                this.logger.trace(message);
                break;
            default:
                break;
        }
    }
}
