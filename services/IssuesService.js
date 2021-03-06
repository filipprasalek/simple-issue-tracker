const IssuesMapper = require('./IssuesMapper');
const {IssueNotFoundError, InvalidIssueStateError} = require.main.require('./model/errors');
const allowedIssueStateTransitions = require.main.require('./utils/dictionary').IssueStateTransitions;

const IssuesService = (IssuesRepository) => ({
  get: async (issueId) => {
    const issue = IssuesRepository.findOne({ id: issueId });
    if (!issue) {
      throw new IssueNotFoundError(`Could not find Issue with id: ${issueId}`)
    }
    return IssuesMapper.mapIssueDBEntityToDTO(issue);
  },

  getAll: async () => IssuesRepository.find().map(IssuesMapper.mapIssueDBEntityToDTO).reverse(),

  create: async createIssueRQ => {
    const issue = IssuesRepository.insert(IssuesMapper.mapCreateIssueRQToDBEntity(createIssueRQ));
    return issue.id;
  },

  updateState: async (issueId, updateIssueStateRQ) => {
    const issue = IssuesRepository.findOne({ id: issueId });
    if (!issue) {
      throw new IssueNotFoundError(`Could not find Issue with id: ${issueId}`)
    }
    const newState = updateIssueStateRQ.state.toUpperCase();
    const allowedNewStates = allowedIssueStateTransitions.has(issue.state) ? allowedIssueStateTransitions.get(issue.state) : [];
    if (!allowedNewStates.includes(newState)) {
      throw new InvalidIssueStateError(`Could not update issue state from ${issue.state} to ${newState}. Allowed target states: ${allowedNewStates}`)
    }
    issue.state = newState;
    IssuesRepository.update(issue);
  }
});

module.exports = IssuesService;