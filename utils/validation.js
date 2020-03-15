const {createIssueRQ, updateIssueStateRQ} = require.main.require('./model/schema');
const prepareErrorResponseBody = require.main.require('./model/errors').prepareErrorResponseBody;

const getErrorResponse = error => prepareErrorResponseBody(`Invalid request body: ${error.details[0].message}`);

const createIssueRQValidator = async (req, res, next) => {
  try {
    await createIssueRQ.validateAsync(req.body);
  } catch(error) {
    return res.status(400).json(getErrorResponse(error));
  }
  next();
}

const updateIssueStateRQValidator = async (req, res, next) => {
  try {
    await updateIssueStateRQ.validateAsync(req.body);
  } catch(error) {
    return res.status(400).json(getErrorResponse(error));
  }
  next();
}

module.exports = {
  createIssueRQValidator,
  updateIssueStateRQValidator
}