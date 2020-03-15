const IssueState = {
  OPEN: 'OPEN',
  PENDING: 'PENDING',
  CLOSED: 'CLOSED'
};

const IssueStateTransitions = new Map();
IssueStateTransitions.set(IssueState.OPEN, [IssueState.PENDING]);
IssueStateTransitions.set(IssueState.PENDING, [IssueState.CLOSED]);
IssueStateTransitions.set(IssueState.CLOSED, []);

module.exports = {
  IssueState,
  IssueStateTransitions
}