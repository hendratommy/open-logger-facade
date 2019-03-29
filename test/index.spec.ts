import "reflect-metadata";
import { describe } from "mocha";
import LoggerFactory, { ILogger, LoggerContext } from "../src";
import { hookConsole, createWinstonLogger } from "./test-helper";
import { expect } from "chai";
import * as pino from "pino";
import * as split from "split2";
import { Logger } from "../src/decorators/Logger";

describe(`logging using winston`, () => {
    const message = `this is a message`;

    beforeEach((done) => {
        const logger = createWinstonLogger();
        LoggerContext.use(logger);
        done();
    });
    describe(`leveled log filter`, () => {
        let logger: ILogger;
        let logOutput: any;
        let unhookConsole: any;

        beforeEach((done) => {
            LoggerContext.use(
                createWinstonLogger({
                    level: `info`
                })
            );
            done();
        });
        beforeEach((done) => {
            logger = LoggerFactory.getLogger();
            unhookConsole = hookConsole(
                process.stdout,
                (text: string, encoding: string, fd: any) => {
                    logOutput = text;
                }
            );
            done();
        });
        afterEach((done) => {
            unhookConsole();
            logOutput = undefined;
            done();
        });

        it(`should not log`, () => {
            const log = { message: `this should not log` };
            logger.debug(log);
            expect(logOutput).to.equals(undefined);
        });

        it(`should log`, () => {
            const log = { message: `this should log` };
            logger.info(log);
            const outputObj = JSON.parse(logOutput);
            expect(outputObj).to.deep.equals(log);
        });
    });

    describe(`logging using leveled log method`, () => {
        let logger: ILogger;
        let logOutput: any;
        let unhookConsole: any;
        beforeEach((done) => {
            logger = LoggerFactory.getLogger();
            unhookConsole = hookConsole(
                process.stdout,
                (text: string, encoding: string, fd: any) => {
                    logOutput = text;
                }
            );
            done();
        });
        afterEach((done) => {
            unhookConsole();
            logOutput = undefined;
            done();
        });
        it(`should equals`, () => {
            let expected = { level: `fatal`, message };
            logger.fatal(message);
            let outputObj = JSON.parse(logOutput);
            expect(outputObj).to.deep.equals(expected);

            expected = { level: `error`, message };
            logger.error(message);
            outputObj = JSON.parse(logOutput);
            expect(outputObj).to.deep.equals(expected);

            expected = { level: `warn`, message };
            logger.warn(message);
            outputObj = JSON.parse(logOutput);
            expect(outputObj).to.deep.equals(expected);

            expected = { level: `info`, message };
            logger.info(message);
            outputObj = JSON.parse(logOutput);
            expect(outputObj).to.deep.equals(expected);

            expected = { level: `debug`, message };
            logger.debug(message);
            outputObj = JSON.parse(logOutput);
            expect(outputObj).to.deep.equals(expected);

            expected = { level: `trace`, message };
            logger.trace(message);
            outputObj = JSON.parse(logOutput);
            expect(outputObj).to.deep.equals(expected);
        });
    });
});

describe(`logging using pino`, () => {
    let logOutput: any;
    beforeEach((done) => {
        LoggerContext.use(
            pino(
                { level: "trace" },
                split((data) => {
                    logOutput = JSON.parse(data);
                })
            )
        );
        done();
    });
    describe(`leveled log filter`, () => {
        let logger: ILogger;
        const message = `this is a message`;
        let otherLogOutput: any;
        beforeEach((done) => {
            LoggerContext.use(
                pino(
                    { level: "info" },
                    split((data) => {
                        otherLogOutput = JSON.parse(data);
                    })
                )
            );
            done();
        });
        beforeEach((done) => {
            logger = LoggerFactory.getLogger();
            otherLogOutput = undefined;
            done();
        });

        it(`should not log`, () => {
            logger.debug(message);
            expect(otherLogOutput).to.deep.equals(undefined);
        });

        it(`should log`, () => {
            logger.info(message);
            expect(otherLogOutput).to.include({
                level: pino.levels.values.info,
                msg: message
            });
        });
    });
    //
    describe(`logging using leveled log method`, () => {
        let logger: ILogger;
        const message = `this is a message`;
        beforeEach((done) => {
            logger = LoggerFactory.getLogger();
            logOutput = undefined;
            done();
        });

        it(`should include`, () => {
            logger.fatal(message);
            expect(logOutput).to.include({
                level: pino.levels.values.fatal,
                msg: message
            });

            logger.error(message);
            expect(logOutput).to.include({
                level: pino.levels.values.error,
                msg: message
            });

            logger.warn(message);
            expect(logOutput).to.include({
                level: pino.levels.values.warn,
                msg: message
            });

            logger.info(message);
            expect(logOutput).to.include({
                level: pino.levels.values.info,
                msg: message
            });

            logger.debug(message);
            expect(logOutput).to.include({
                level: pino.levels.values.debug,
                msg: message
            });

            logger.trace(message);
            expect(logOutput).to.include({
                level: pino.levels.values.trace,
                msg: message
            });
        });
    });
});

class MyClass {
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

describe(`logging using @Logger decorator`, () => {
    let logOutput: any;
    beforeEach((done) => {
        LoggerContext.use(
            pino(
                { level: "trace" },
                split((data) => {
                    logOutput = JSON.parse(data);
                })
            )
        );
        done();
    });
    describe(`logging using leveled log method`, () => {
        const myClass = new MyClass();
        const message = `this is a message`;
        beforeEach((done) => {
            logOutput = undefined;
            done();
        });

        it(`should include`, () => {
            myClass.handleLog(`fatal`, message);
            expect(logOutput).to.include({
                level: pino.levels.values.fatal,
                msg: message
            });

            myClass.handleLog(`error`, message);
            expect(logOutput).to.include({
                level: pino.levels.values.error,
                msg: message
            });

            myClass.handleLog(`warn`, message);
            expect(logOutput).to.include({
                level: pino.levels.values.warn,
                msg: message
            });

            myClass.handleLog(`info`, message);
            expect(logOutput).to.include({
                level: pino.levels.values.info,
                msg: message
            });

            myClass.handleLog(`debug`, message);
            expect(logOutput).to.include({
                level: pino.levels.values.debug,
                msg: message
            });

            myClass.handleLog(`trace`, message);
            expect(logOutput).to.include({
                level: pino.levels.values.trace,
                msg: message
            });
        });
    });
});
