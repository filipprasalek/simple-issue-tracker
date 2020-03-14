const Joi = require('@hapi/joi');

const createIssueRQ = Joi.object({
  title: Joi.string().min(6).max(30).required(),
  description: Joi.string().required()
});

const updateIssueStateRQ = Joi.object({
  state: Joi.string().insensitive().valid('PENDING', 'CLOSED').required()
});

module.exports = {
  createIssueRQ,
  updateIssueStateRQ
}