import password from "./password.mjs"

// const MongoClient = require('mongodb').MongoClient;
import mongodb from 'mongodb';
const MongoClient = mongodb.MongoClient


const uri = `mongodb+srv://williampolet:${password}@clusterbecode.s1alsc3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });



  async function run() {
    try {
      await client.connect();
  
      console.log('Connected to the database!');
  
      /* Creation of different collections
      const usersCollection = client.db('socialApp').collection('users');

      const postsCollection = client.db('myapp').collection('posts');
      postsCollection.createIndex({ user_id: 1, created_at: -1 });
      
      const commentsCollection = client.db('myapp').collection('comments');
      commentsCollection.createIndex({ post_id: 1, created_at: 1 });    
      */  


      /* add data into the collections
      const usersCollection = client.db('myapp').collection('users'); */
      const postsCollection = client.db('myapp').collection('posts');
      /* const commentsCollection = client.db('myapp').collection('comments');

      const user = { name: 'John Wick', email: 'JohnWick@mail.com' };
      const user2 = { name: 'Jules Vern', email: 'JulesVern@mail.com' };
      const userResult = await usersCollection.insertOne(user);
      const userResult2 = await usersCollection.insertOne(user2);

      const post = { user_id: userResult.insertedId, content: 'Hello world!', created_at: new Date() };
      const postResult = await postsCollection.insertOne(post);

      const comment = { post_id: postResult.insertedId, user_id: userResult2.insertedId, content: 'Nice post!', created_at: new Date() };
      await commentsCollection.insertOne(comment);
      */

      const postsWithComments = await postsCollection.aggregate([ // Aggregate is for writing queries
        { $lookup: { from: 'comments', localField: '_id', foreignField: 'post_id', as: 'comments' } },
        { $sort: { created_at: -1 } }
      ]).toArray();
      
      console.log(postsWithComments);

    } catch (err) {
      console.error(err);
    } 
  }
  
  run();