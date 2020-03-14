const router = require('express').Router();
const issueService = require.main.require('./services/issuesService');
const validation = require.main.require('./utils/validation');

router.get('/', async (_, res) => {
  const issues = await issueService.getAll();
  res.json(issues);
});

router.get('/:issueId', async (req, res) => {
  const issue = await issueService.get(req.params.issueId);
  res.json(issue);
})

router.post('/', validation.createIssueRQValidator, async (req, res) => {
  try {
    const issueId = await issueService.create(req.body);
    res.status(201).location(`${req.originalUrl}/${issueId}`).send();
  } catch(err) {
    res.status(500).json({ error: 'Error while creating issue: ' + err });
  }
});

router.put('/:issueId/state', validation.updateIssueStateRQValidator, async (req, res) => {
  await issueService.updateState(req.params.issueId, req.body);
  res.sendStatus(200);
});

module.exports = router;