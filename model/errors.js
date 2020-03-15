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

module.exports = {
  IssueNotFoundError,
  InvalidIssueStateError
}