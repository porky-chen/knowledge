import winston from "winston"; // 日志库

const options: winston.LoggerOptions = {
    // level: "info",
    // format: winston.format.json(),
    // defaultMeta: { service: "user-service" },
    transports: [ // Creating your own Logger
        new winston.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options); // 创建日志记录器

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
