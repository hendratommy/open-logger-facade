const winston = require("winston");
const LoggerContext = require("../dist/src").LoggerContext;
const LoggerFactory = require("../dist/src").LoggerFactory;

const winstonLogger = winston.createLogger(
    winston.createLogger({
        level: "silly",
        exitOnError: false,
        transports: [new winston.transports.Console()]
    })
);

LoggerContext.use(winstonLogger);

let logger = LoggerFactory.getLogger();
logger.verbose(
    `This is somewhat more dependent to winston, since other loggers vendor might not have verbose method`
);

const customLevelWinston = winston.createLogger({
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

LoggerContext.use(customLevelWinston);
logger = LoggerFactory.getLogger();
logger.trace(`Now its better`);
