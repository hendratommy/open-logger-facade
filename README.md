# open-logger-facade

A simple logger facade for NodeJS, an abstraction class for logging. Works and tested with winston and pino.
If you're working with TypeScript, you might want to use `@Logger` decorator (required `reflect-metadata`).

## Installation

```

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
```

`open-logger-facade` is just an simple interface to bridge between your code and logger library, the idea is to create SLF4J like for NodeJS.
This way your project is loosely coupled with any logger library, and you can switch between logger libraries very easily.

`open-logger-facade` required the logger implementation to implement leveled method, `open-logger-facade` use 5 levels:

-   `fatal`
-   `error`
-   `warn`
-   `info`
-   `debug`
-   `trace`

`pino` and `bunyan` also had those levels, so they should works out of the box with `open-logger-facade`. If you're using `winston` you need to use custom levels and configure it to use the same levels as required by `open-logger-facade`.

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

LoggerContext.use(winston);
const logger = LoggerFactory.getLogger();

logger.info(`Hello World!`);
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
