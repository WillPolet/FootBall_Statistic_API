import password from "./password.mjs";
import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://williampolet:${password}@clusterbecode.s1alsc3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

async function run() {
  try {
    await client.connect();

    console.log('Connected to the database!');

    const collection = client.db('test').collection('students');

    const result = await collection.insertOne({
      name: 'John Dill',
      age: 25,
      grade: 'A'
    });

    // console.log(`Inserted ${insertedId} document into the collection`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
