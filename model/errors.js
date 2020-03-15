const logger = require.main.require('./utils/logger').logger;

class IssueNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IssueNotFoundError';
  }
};

class InvalidIssueStateError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidIssueStateError';
  }
}

const prepareErrorResponseBody = (message) => {
  logger.error(message);
  return {error: message};
}

module.exports = {
  IssueNotFoundError,
  InvalidIssueStateError,
  prepareErrorResponseBody
}