const express = require('express');
const app = express();

app.get('/', (_, res) => {
  res.send('This is issue-tracker app');
});

app.listen(3000, () => console.log('Server is listening...'));