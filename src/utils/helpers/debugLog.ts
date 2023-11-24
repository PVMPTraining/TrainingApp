/**
 * Represents the log levels for debugging and logging purposes.
 *
 * @enum {number}
 */
export enum LogLevel {
	DEBUG, // Only for development
	TRACE, // Only for development
	INFO,
	WARN,
	ERROR
}

/**
 * Logs a message with the specified log level.
 * @param logLevel - The log level [DEBUG, TRACE; INFO; WARN, ERROR].
 * @param message - The message to be logged.
 */
export const Log = (logLevel: LogLevel, message: string) => {
	switch (logLevel) {
		case LogLevel.DEBUG:
			{
				if (process.env.NODE_ENV === "development") {
					console.debug(`[DEBUG]: ${message}`);
				}
			}
			break;
		case LogLevel.TRACE:
			{
				if (process.env.NODE_ENV === "development") {
					console.trace(`[TRACE]: ${message}`);
				}
			}
			break;
		case LogLevel.INFO:
			console.log(`[INFO]: ${message}`);
			break;
		case LogLevel.WARN:
			console.warn(`[WARN]: ${message}`);
			break;
		case LogLevel.ERROR:
			console.error(`[ERROR]: ${message}`);
			break;
	}
};
