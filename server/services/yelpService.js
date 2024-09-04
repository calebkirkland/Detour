const axios = require('axios');
const config = require('../config');

exports.getSuggestions = async (location, preferences) => {
  try {
    const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${config.YELP_API_KEY}`,
      },
      params: {
        location,
        term: preferences.join(' '),
        limit: 5,
      },
    });

    return response.data.businesses.map(business => ({
      name: business.name,
      description: business.categories.map(cat => cat.title).join(', '),
      type: 'Business',
      location: {
        lat: business.coordinates.latitude,
        lng: business.coordinates.longitude
      },
      priceLevel: business.price
    }));
  } catch (error) {
    throw new Error('Error fetching suggestions from Yelp');
  }
};
