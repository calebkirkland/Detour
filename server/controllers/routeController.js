const googleMapsService = require('../services/googleMapsService');
const Trip = require('../models/Trip');

let trips = [];

exports.calculateRoute = async (req, res) => {
  const { origin, destination, preferences } = req.body;
  try {
    const route = await googleMapsService.calculateRoute(origin, destination);
    const tripId = Date.now().toString();
    const newTrip = { id: tripId, route, preferences, approvedStops: [] };
    trips.push(newTrip);
    res.json(newTrip);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating route' });
  }
};


exports.exportRoute = async (req, res) => {
  try {
    const { tripId } = req.body;
    const trip = await Trip.findById(tripId);
    const exportedRoute = await googleMapsService.exportRoute(trip.route, trip.approvedStops);
    res.json({ exportedRoute });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
