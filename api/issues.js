const router = require('express').Router();
const issuesService = require.main.require('./services/IssuesService');
const IssuesRepository = require.main.require('./utils/database').IssuesRepository;
const {IssueNotFoundError, InvalidIssueStateError, prepareErrorResponseBody} = require.main.require('./model/errors');
const validation = require.main.require('./utils/validation');

const IssuesService = issuesService(IssuesRepository);

router.get('/', (_, res, next) => {
  IssuesService.getAll()
    .then(issues => res.json(issues))
    .catch(error => next(error));
});

router.post('/', validation.createIssueRQValidator, (req, res, next) => {
  IssuesService.create(req.body)
    .then(issueId => res.location(`${req.originalUrl}/${issueId}`).status(201).send())
    .catch(error => next(error));
});

router.get('/:issueId', (req, res, next) => {
  IssuesService.get(req.params.issueId)
    .then(issue => res.json(issue))
    .catch(error => next(error));
});

router.put('/:issueId/state', validation.updateIssueStateRQValidator, (req, res, next) => {
  IssuesService.updateState(req.params.issueId, req.body)
    .then(() => res.sendStatus(200))
    .catch(error => next(error));
});

router.use((err, _, res, next) => {
  if (err instanceof IssueNotFoundError) {
    return res.status(404).json(prepareErrorResponseBody(err.toString()));
  } else if (err instanceof InvalidIssueStateError) {
    return res.status(400).json(prepareErrorResponseBody(err.toString()));
  }
  next(err);
});

module.exports = router;