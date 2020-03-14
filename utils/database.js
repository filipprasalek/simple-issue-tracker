const loki = require('lokijs');
const inMemoryDB = new loki('db.json')

if (!inMemoryDB.getCollection('issues')) {
  inMemoryDB.addCollection('issues');
}

module.exports = {
  issuesRepository: inMemoryDB.getCollection('issues')
};