require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
  REACT_APP_GOOGLE_MAPS_API_KEY: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  YELP_API_KEY: process.env.YELP_API_KEY,
  MONGODB_URI: process.env.MONGODB_URI
};

