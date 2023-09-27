import express from 'express'
import replaceSpacesWithPercent20 from './replaceSpaces.mjs'
import bodyParser from 'body-parser'
import getPicture from './getPicture.mjs'
const app = express()
const PORT = 5000

app.set('view-engine', 'ejs')
// app.use(express.urlencoded({extended: false}))
// Use body-parser to parse form data sent via HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));

// Use body-parser to parse JSON data sent via HTTP POST
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/', async (req, res) => {
    const data = {
        firstName : replaceSpacesWithPercent20(req.body.firstName),
        lastName : replaceSpacesWithPercent20(req.body.lastName)
    }
    let pictureURL = await getPicture(data.firstName, data.lastName)
    if (!pictureURL){
        pictureURL = 'https://fifastatic.fifaindex.com/FIFA23/players/263952.png'
    }
    fetch(`http://localhost:3000/api/players/${data.firstName}%20${data.lastName}`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log(data)
        res.render('player.ejs', {name : data.name, nationality : data.nationality, club : data.club, overallRating : data.overallRating, age : data.age, pictureURL : pictureURL });
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
})

app.get('/Players/:page', async (req, res) => {
  let page = req.params.page
  const apiUrl = 'http://localhost:3000/api/players';

  const queryParams = new URLSearchParams({
    limit: 10, // Limit the results to 50
    // Add any other query parameters here if needed
  });

const fetchUrl = `${apiUrl}?${queryParams}`;
  fetch(fetchUrl)
  .then (response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {  
    console.log(data)
    res.render('allPlayers.ejs', {allPlayers : data})
  })
  // res.render('allPlayers.ejs')
})


app.listen(PORT, () => console.log(`Server started: http://localhost:${PORT}/`))

