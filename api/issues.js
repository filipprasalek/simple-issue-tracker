const router = require('express').Router();
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
  res.json(req.body);
});

router.put('/:issueId/state', updateIssueStateRQValidator, async (req, res) => {
  res.json(req.body);
});

module.exports = router;