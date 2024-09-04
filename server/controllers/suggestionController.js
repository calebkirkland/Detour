const groqService = require('../services/groqService');
const yelpService = require('../services/yelpService');
const Trip = require('../models/Trip');

let trips = [];

exports.generateSuggestions = async (req, res) => {
  const { tripId, currentLocation } = req.body;
  try {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    const suggestions = await yelpService.getSuggestions(currentLocation, trip.preferences);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: 'Error generating suggestions' });
  }
};

exports.approveSuggestion = async (req, res) => {
  const { tripId, suggestion } = req.body;
  try {
    const trip = trips.find(t => t.id === tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    trip.approvedStops.push(suggestion);
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error approving suggestion' });
  }
};

exports.denySuggestion = async (req, res) => {
  // No need to store denied suggestions, just return success
  res.json({ message: 'Suggestion denied successfully' });
};


exports.denySuggestion = async (req, res) => {
  res.json({ message: 'Suggestion denied successfully' });
};

exports.resuggestStop = async (req, res) => {
  try {
    const { tripId, currentLocation } = req.body;
    const trip = await Trip.findById(tripId);
    const newSuggestion = await groqService.generateSingleSuggestion(trip.preferences, currentLocation);
    res.json({ suggestion: newSuggestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};