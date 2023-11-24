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
 * @param logLevel - The log level.
 * @param message - The message to be logged.
 * @param options - Additional options for the log message.
 */
export const Log = (logLevel: LogLevel, message: string, options?: { [key: string]: any }) => {
	switch (logLevel) {
		case LogLevel.DEBUG: {
			if (process.env.NODE_ENV === "development") {
				const logMessage = `[DEBUG]: ${message}`;
				options ? console.debug(logMessage, options) : console.debug(logMessage);
			}
			break;
		}
		case LogLevel.TRACE: {
			if (process.env.NODE_ENV === "development") {
				const logMessage = `[TRACE]: ${message}`;
				options ? console.trace(logMessage, options) : console.debug(logMessage);
			}
			break;
		}
		case LogLevel.INFO:
			{
				const logMessage = `[INFO]: ${message}`;
				options ? console.trace(logMessage, options) : console.debug(logMessage);
			}
			break;
		case LogLevel.WARN:
			{
				const logMessage = `[WARN]: ${message}`;
				options ? console.trace(logMessage, options) : console.debug(logMessage);
			}
			break;
		case LogLevel.ERROR:
			{
				const logMessage = `[ERROR]: ${message}`;
				options ? console.trace(logMessage, options) : console.debug(logMessage);
			}
			break;
	}
};
