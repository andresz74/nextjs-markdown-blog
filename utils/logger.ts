type LogArgs = unknown[];

const shouldLogInfo = process.env.NODE_ENV !== 'production';

const formatArgs = (scope: string, args: LogArgs) => [`[${scope}]`, ...args];

export const logger = {
	info: (scope: string, ...args: LogArgs) => {
		if (shouldLogInfo) {
			console.info(...formatArgs(scope, args));
		}
	},
	warn: (scope: string, ...args: LogArgs) => {
		console.warn(...formatArgs(scope, args));
	},
	error: (scope: string, ...args: LogArgs) => {
		console.error(...formatArgs(scope, args));
	},
};

export default logger;
