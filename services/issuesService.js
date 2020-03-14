const uuid = require('uuid');
const issuesRepository = require('../utils/database.js').issuesRepository;

const issuesService = {
  get: async (issueId) => issuesRepository.find({id: issueId}),
  getAll: async () => issuesRepository.find(),
  create: async createIssueRQ => {
    const issue = issuesRepository.insert({...createIssueRQ, id: uuid.v4(), state: 'OPEN'})
    return issue.id;
  },
  update: async (issueId, updateIssueStateRQ) => {}
}

module.exports = issuesService;