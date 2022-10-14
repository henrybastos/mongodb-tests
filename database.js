const { MongoClient } = require('mongodb');

const USERNAME = 'henryBastos';
const PASSWORD = '***'; 

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@maincluster.rdy0alw.mongodb.net/?retryWrites=true&w=majority`;

const DATABASES = {
  TEST: 'testdb'
}

async function main () {
  const client = new MongoClient(URI);

  try {
    await client.connect();

    // await listDatabases(client);

    // await insertNewItem(client, {
    //   name: 'Charming house',
    //   summary: 'A beautiful house in London.'
    // });

    // await insertManyItems(client, [
    //   {
    //     name: 'John Doe',
    //     age: 20
    //   },
    //   {
    //     name: 'Jane Doe',
    //     age: 25
    //   },
    // ]);

  await findSingleUser(client, 'John Doe');
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// ---------- CREATE ---------- //

async function insertNewItem (client, newItem) {
  const result = await client.db(DATABASES.TEST).collection("users").insertOne(newItem);
  console.log(`\nNew item inserted: _id: ${result.insertedId}`);
  console.log(newItem);
}

async function insertManyItems (client, newItems) {
  const result = await client.db(DATABASES.TEST).collection('users').insertMany(newItems);
  console.log(`\nNew items inserted: _id: ${result.insertedId}`);
  console.log(newItems);
}

// ---------- READ ---------- //

async function findSingleUser (client, userName) {
  const result = await client.db(DATABASES.TEST).collection('users').findOne({ name: userName });

  if (result) {
    console.log(`User with the name ${userName} found successfully!`);
    console.log(result);
  } else {
    console.log(`No user with the name ${userName} was found. :/`);
  }
}

async function listDatabases (client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');

  databasesList.databases.forEach(db => {
    console.log(` - ${db.name}`);
  })
}

// ---------- UPDATE ---------- //

// ---------- DELETE ---------- //