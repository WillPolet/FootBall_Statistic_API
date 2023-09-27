import axios from 'axios';
import cheerio from 'cheerio';

const getPicture = async (firstName, lastName) => {
  try {
    const response = await axios.get(`https://www.fifaindex.com/players/?name=${firstName}+${lastName}&order=desc`);
    const $ = cheerio.load(response.data);

    const id = $('tbody tr[data-playerid]').data('playerid');

    if (id) {
      const img = `https://fifastatic.fifaindex.com/FIFA23/players/${id}.png`
      return img;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export default getPicture;
