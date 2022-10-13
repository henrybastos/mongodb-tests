const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://henryBastos:4488ppttPPTT@maincluster.rdy0alw.mongodb.net/?retryWrites=true&w=majority";
const databases = {
  test: 'testdb'
}

async function main () {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
    await insertNewItem(client, {
      name: 'Lovely loft',
      summary: 'A charming loft in Paris'
    });

  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function insertNewItem (client, newItem) {
  const result = await client.db(databases.test).collection("users").insertOne(newItem);
  console.log(`New item inserted: _id: ${result.insertedId}`);
}

async function insertManyItems (client, newItems) {
  const result = await client.db(databases.test).collection('users').insertMany(newItems);
  console.log(`New items inserted: _id: ${result.insertedId}`);
}

async function listDatabases (client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');

  databasesList.databases.forEach(db => {
    console.log(` - ${db.name}`);
  })
}