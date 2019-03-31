# open-logger-facade

[![Build Status](https://travis-ci.com/hendratommy/open-logger-facade.svg?branch=master)](https://travis-ci.com/hendratommy/open-logger-facade)

A simple logger facade for NodeJS, an abstraction class for logging. Works and tested with winston and pino.
If you're working with TypeScript, you might want to use `@Logger` decorator (require `reflect-metadata`).

## Installation

```
npm install -S open-logger-facade
```

## Usage

```
# in your index file
import { LoggerContext, LoggerFactory } from "open-logger-facade";
import * as pino from "pino";

LoggerContext.use(pino());
const logger = LoggerFactory.getLogger();
logger.fatal(`fatal message`);
logger.error(`error message`);
logger.warn(`warn message`);
logger.info(`info message`);
logger.debug(`debug message`);
logger.trace(`trace message`);
...

# in other files, you just need to call LoggerFactory.getLogger() to get the logger instance, ie.
## Other.js
class OtherClass {
    doSomething() {
        const logger = LoggerFactory.getLogger();
        logger.debug(`debug message`);
    }
}
// This is useful when you have Service or Repository classes, you can get logger instance without passing it around as parameter
```

`open-logger-facade` is just an simple interface to bridge between your code and logger library, the idea is to decoupled code with logger implementation.
This way your project is loosely coupled with any logger library, and you can switch between logger libraries very easily (given the logger implementation is using the same leveled method `fatal`, `error`, `warn`, `info`, `debug`, and `trace`).

In case you're using `winston`, it is recommended you're changing the levels to match above levels. This way, you can switch with other loggers such as `pino` or `bunyan` without refactoring your codes too much. See `examples/WinstonExample.js` and `examples/WinstonExampleTS.ts` if you're using `TypeScript`.

`pino` and `bunyan` also had those levels, so they should works out of the box with `open-logger-facade`.

## Configuring winston

```
import * as winston from "winston";
import { LoggerContext, LoggerFactory } from "open-logger-facade";

const winstonLogger = winston.createLogger({
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
        }
    });

LoggerContext.use(winstonLogger);
const logger = LoggerFactory.getLogger();

logger.trace(`Hello World!`);
```

## @Logger decorator

-   Install `reflect-metadata`

```
npm install -S reflect-metadata
```

-   Enable `experimentalDecorators` and `emitDecoratorMetadata` inside your `tsconfig.json`

```
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

-   In your root file (`index.ts`), import `reflect-metadata`

### Example

`MyClass.ts`

```
import { Logger } from "open-logger-facade/decorators/Logger";
class MyClass {
    @Logger()
    logger!: ILogger;

    someFunc() {
        this.logger.info(`Hello from MyClass!`);
    }
}
```

`index.ts`

```
import "reflect-metadata";
import { LoggerContext, LoggerFactory } from "open-logger-facade";
import * as pino from "pino";
import {MyClass} from "./MyClass"
...
LoggerContext.use(pino());


const myClass = new MyClass();
myClass.someFunc();
```
