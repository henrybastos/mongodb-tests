const { MongoClient } = require('mongodb');

MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology : true }, (error, connection) => {
  if (error) return console.error(error);
  global.connection = connection.db("testdb");
  console.log('Connected!');
});

module.exports = {};