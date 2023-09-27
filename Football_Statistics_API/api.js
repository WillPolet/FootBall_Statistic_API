const express = require('express');
const router = express.Router();
const Player = require('./playersModel');

router.get('/players', async (req, res) => {
try {
const players = await Player.find({});
res.json(players);
} catch (err) {
console.log(err);
res.status(500).send('Server error');
}
});

router.get('/players/:playerName', async (req, res) => {
    try {
        console.log(req.params['playerName'])
        const player = await Player.findOne({name :`${req.params['playerName']}`});
        res.json(player)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})

router.get('/players/sorted/:category', async (req, res) => {
    try {
      const sortingCategory = req.params.category;
      const sortObject = {};
      sortObject[sortingCategory] = 1;
  
      const players = await Player.find().sort(sortObject);
      res.json(players);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;