import SimpleLogger from 'simple-node-logger';

export default class Printer {
    static printInfo(message) {
        const logger = new SimpleLogger.createSimpleLogger();
        logger.info(`${message}`);
    }

    static printError(message) {
        const logger = new SimpleLogger.createSimpleLogger();
        logger.error(`${message}`);
    }
}
