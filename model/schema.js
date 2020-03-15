const Joi = require('@hapi/joi');
const IssueState = require.main.require('./utils/dictionary').IssueState;

const createIssueRQ = Joi.object({
  title: Joi.string()
    .min(6)
    .max(30)
    .required(),
  description: Joi.string()
    .required()
});

const updateIssueStateRQ = Joi.object({
  state: Joi.string()
    .insensitive()
    .valid(IssueState.OPEN, IssueState.CLOSED, IssueState.PENDING)
    .required()
});

module.exports = {
  createIssueRQ,
  updateIssueStateRQ
}