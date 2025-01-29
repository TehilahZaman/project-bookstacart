const axios = require("axios");
const apiKey = "YOUR_GOOGLE_API_KEY";

async function fetchBooks(query) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.items; // Returns the array of books
  } catch (error) {
    console.error("Error fetching books:", error.message);
    throw error;
  }
}

module.exports = { fetchBooks };
