const log4js = require('log4js');
const morgan = require('morgan');
const logger = log4js.getLogger();

logger.level = 'info';
logger.info('Configured logger...')

const httpLogger = morgan('short', {
  "stream": {
    write: str => { logger.info(str); }
  }
});

module.exports = {
  logger: logger,
  httpLogger: httpLogger
};