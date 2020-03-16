const uuid = require('uuid');

const mapIssueDBEntityToDTO = issue => ({
  id: issue.id,
  title: issue.title,
  description: issue.description,
  state: issue.state
});

const mapCreateIssueRQToDBEntity = createIssueRQ => ({
  id: uuid.v4(),
  title: createIssueRQ.title,
  description: createIssueRQ.description,
  state: 'OPEN'
});

module.exports = {
  mapIssueDBEntityToDTO,
  mapCreateIssueRQToDBEntity
}