const router = require('express').Router();
const issueService = require.main.require('./services/issuesService');
const {
  createIssueRQValidator,
  updateIssueStateRQValidator
} = require.main.require('./utils/validation');

router.get('/', async (_, res) => {
  res.send(_.path);
});

router.get('/:issueId', async (_, res) => {
  res.send(_.path);
})

router.post('/', createIssueRQValidator, async (req, res) => {
  try {
    const issueId = await issueService.create(req.body);
    res.status(201).location(`${req.originalUrl}/${issueId}`).send();
  } catch(err) {
    res.status(500).json({ error: 'Error while creating issue: ' + err });
  }
});

router.put('/:issueId/state', updateIssueStateRQValidator, async (req, res) => {
  res.json(req.body);
});

module.exports = router;