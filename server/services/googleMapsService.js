const { Client } = require('@googlemaps/google-maps-services-js');
const config = require('../config');

const client = new Client({});

exports.calculateRoute = async (origin, destination) => {
  try {
    const response = await client.directions({
      params: {
        origin,
        destination,
        key: config.GOOGLE_MAPS_API_KEY
      }
    });
    return response.data.routes[0];
  } catch (error) {
    throw new Error('Error calculating route');
  }
};

exports.exportRoute = async (route, stops) => {
  try {
    const waypoints = stops.map(stop => ({
      location: `${stop.location.lat},${stop.location.lng}`,
      stopover: true
    }));

    const response = await client.directions({
      params: {
        origin: route.origin,
        destination: route.destination,
        waypoints,
        key: config.GOOGLE_MAPS_API_KEY
      }
    });

    const encodedRoute = response.data.routes[0].overview_polyline.points;
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(route.origin)}&destination=${encodeURIComponent(route.destination)}&waypoints=${encodeURIComponent(waypoints.map(wp => wp.location).join('|'))}&travelmode=driving&dir_action=navigate&encoded_polyline=${encodedRoute}`;
  } catch (error) {
    throw new Error('Error exporting route');
  }
};
