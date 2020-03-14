const uuid = require('uuid');
const issuesRepository = require.main.require('./utils/database.js').issuesRepository;

const mapIssueDBEntityToDTO = issue => ({
  id: issue.id,
  title: issue.title,
  description: issue.description,
  state: issue.state
});

// TODO: Handle errors (e.g. non existing resources)
const issuesService = {
  get: async (issueId) => {
    const issue = issuesRepository.findOne({ id: issueId });
    return mapIssueDBEntityToDTO(issue);
  },
  getAll: async () => issuesRepository.find().map(mapIssueDBEntityToDTO),
  create: async createIssueRQ => {
    const issue = issuesRepository.insert({ ...createIssueRQ, id: uuid.v4(), state: 'OPEN' });
    return issue.id;
  },
  updateState: async (issueId, updateIssueStateRQ) => {
    const issue = issuesRepository.findOne({ id: issueId })
    issue.state = updateIssueStateRQ.state;
    issuesRepository.update(issue);
  }
}

module.exports = issuesService;