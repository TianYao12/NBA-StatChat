// pages/api/nba-news.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Set the API endpoint and your News API key
    const endpoint = 'https://newsapi.org/v2/everything';
    const apiKey = '7c1299368f8145e78b8b35ff5fe2271e';

    // Set the query parameters
    const params = {
      apiKey,
      q: 'NBA',
      language: 'en',
    };

    // Send the request to the News API
    const response = await axios.get(endpoint, { params });

    // Extract the articles from the response
    const articles = response.data.articles;

    // Send the articles as the API response
    res.status(200).json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching NBA news.' });
  }
}
