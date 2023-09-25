import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

createApp(App).mount('#app')

// // Function to make an API request
// async function fetchData() {
//   try {
//     const response = await axios.get('https://alpha-vantage.p.rapidapi.com/query');
//     const data = response.data;
//     // Process the data here
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// // Call the function when needed
// fetchData();