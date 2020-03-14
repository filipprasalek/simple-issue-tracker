const loki = require('lokijs');
const inMemoryDB = new loki('db.json')

inMemoryDB.addCollection('issues');

module.exports = {
  issuesRepository: inMemoryDB.getCollection('issues')
};