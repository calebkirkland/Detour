import React from 'react';

function TripSummary({ trip, onExport }) {
  const calculateTotalDistance = () => {
    return trip.route.legs.reduce((total, leg) => total + leg.distance.value, 0) / 1000; // Convert to km
  };

  const calculateTotalDuration = () => {
    return trip.route.legs.reduce((total, leg) => total + leg.duration.value, 0) / 60; // Convert to minutes
  };

  const estimateTotalCost = () => {
    // This is a very basic estimation and should be improved with more accurate data
    const fuelCost = calculateTotalDistance() * 0.1; // Assume $0.1 per km for fuel
    const foodCost = trip.approvedStops.filter(stop => stop.type === 'restaurant').length * 20; // Assume $20 per meal
    const attractionCost = trip.approvedStops.filter(stop => stop.type === 'attraction').length * 10; // Assume $10 per attraction
    return fuelCost + foodCost + attractionCost;
  };

  return (
    <div className="trip-summary">
      <h2>Trip Summary</h2>
      <p>Total Distance: {calculateTotalDistance().toFixed(2)} km</p>
      <p>Estimated Duration: {calculateTotalDuration().toFixed(2)} minutes</p>
      <p>Estimated Cost: ${estimateTotalCost().toFixed(2)}</p>
      <h3>Approved Stops:</h3>
      <ul>
        {trip.approvedStops.map((stop, index) => (
          <li key={index}>{stop.name} - {stop.type}</li>
        ))}
      </ul>
      <button onClick={onExport}>Export Route</button>
    </div>
  );
}

export default TripSummary;
