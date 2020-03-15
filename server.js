const express = require('express');
const { httpLogger, logger } = require('./utils/logger');
const prepareErrorResponseBody = require('./model/errors').prepareErrorResponseBody;

const app = express();

app.use(httpLogger)
app.use(express.json())

const issuesRoute = require('./api/issues');
app.use('/api/v1/issues', issuesRoute);

app.get('/', (_, res) => {
  res.send('This is issue-tracker app');
});

app.use((err, _, res, __) => {
  res.status(500).json(prepareErrorResponseBody(`Unexpected error - ${err}`));
})

app.listen(3000, () => logger.info('Server is listening...'));