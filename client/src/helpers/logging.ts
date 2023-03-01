const DEFAULT_NAMESPACE = "Server";

const info = (message: string, namespace?: string) => {
	if (typeof message === "string") {
		console.log(
			` [${getData()}] [${namespace || DEFAULT_NAMESPACE}] [INFO ] ${message}`
		);
	}
	console.info(`[${namespace || DEFAULT_NAMESPACE}] ,`, message);
};

const error = (message: string, namespace?: string) => {
	if (typeof message === "string") {
		console.log(
			` [${getData()}] [${namespace || DEFAULT_NAMESPACE}] [ERROR] ${message}`
		);
	}
	console.error(`[${namespace || DEFAULT_NAMESPACE}] [ERROR],`, message);
};

const warn = (message: string, namespace?: string) => {
	if (typeof message === "string") {
		console.log(
			` [${getData()}] [${namespace || DEFAULT_NAMESPACE}] [WARN ] ${message}`
		);
	}
	console.warn(`[${namespace || DEFAULT_NAMESPACE}] [WARN]`, message);
};

const getData = () => {
	return new Date().toISOString();
};

const logging = { info, error, warn };

export default logging;
