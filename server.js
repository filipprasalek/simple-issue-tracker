const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const issuesRoute = require('./api/issues')

app.use(bodyParser.json())
app.use('/api/v1/issues', issuesRoute)

app.get('/', (_, res) => {
  res.send('This is issue-tracker app');
});

app.listen(3000, () => console.log('Server is listening...'));