const router = require('express').Router();
const issueService = require.main.require('./services/issuesService');
const validation = require.main.require('./utils/validation');

router.get('/', (_, res, next) => {
  issueService.getAll()
    .then(issues => res.json(issues))
    .catch(error => next(error));
});

router.post('/', validation.createIssueRQValidator, (req, res, next) => {
  issueService.create(req.body)
    .then(issueId => res.status(201).location(`${req.originalUrl}/${issueId}`).send())
    .catch(error => next(error));
});

router.get('/:issueId', (req, res, next) => {
  issueService.get(req.params.issueId)
    .then(issue => res.json(issue))
    .catch(error => next(error));
})

router.put('/:issueId/state', validation.updateIssueStateRQValidator, (req, res, next) => {
  issueService.updateState(req.params.issueId, req.body)
    .then(() => res.sendStatus(200))
    .catch(error => next(error));
});

module.exports = router;