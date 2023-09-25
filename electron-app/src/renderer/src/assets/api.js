const axios = require('axios');

const API_OPTIONS = {
  method: 'GET',
  url: 'https://rawg-video-games-database.p.rapidapi.com/games',
  headers: {
    'X-RapidAPI-Key': '3dfbac2aeemsh2c1e7918a200ce2p1d8a6ejsn6e1703a135af', // Replace with your actual API key
    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
  },
};

async function fetchDataFromAPI() {
  try {
    const response = await axios.request(API_OPTIONS);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = {
  fetchDataFromAPI,
};
