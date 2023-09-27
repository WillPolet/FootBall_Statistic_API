import mongodb from 'mongodb';
import axios from 'axios';
import cheerio from 'cheerio';
import password from "../repo/password.mjs";

const MongoClient = mongodb.MongoClient;

const uri = `mongodb+srv://williampolet:${password}@clusterbecode.s1alsc3.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getData = (pageNumber) => {
  return axios.get('https://www.fifaindex.com/players/?page=' + pageNumber)
    .then(response => {
      const $ = cheerio.load(response.data);
      const players = [];
  
      $('tbody > tr[data-playerid]').each((i, element) => {
        const name = $(element).find('td[data-title="Name"] > a').text();
        const nationality = $(element).find('td[data-title="Nationality"] > a').attr('title');
        const club = $(element).find('td[data-title="Team"] > a').attr('title');
        const overallRating = $(element).find('td[data-title="OVR / POT"] > span:nth-child(1)').text();
        const age = $(element).find('td[data-title="Age"]').text();
  
        players.push({ name, nationality, club, overallRating, age });
      });
      
      return players;
    })
    .catch(error => {
      console.error(error);
    });
    
  }

  
const storeData = async () => {
  try {
    await client.connect();

    for (let i = 2 ; i < 606 ; i++){
      let players = await getData(i)
      const collection = client.db('Football_Statistic_App').collection('Players');
      const result = await collection.insertMany(players);
      console.log(`${result.insertedCount} players inserted`);
    }
  }
  catch (err) {
  console.error(err);
}
finally {
  await client.close();
} 
}

storeData()