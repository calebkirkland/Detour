import React, { useState, useEffect, useRef } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { calculateRoute } from '../services/api';

const libraries = ['places'];

function UserInput({ onRouteCalculated }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [preferences, setPreferences] = useState('');
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const originAutocompleteRef = useRef(null);
  const destinationAutocompleteRef = useRef(null);

  const API_KEY = '';
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  console.log("Google Maps API Key:", API_KEY);



  useEffect(() => {
    if (isUsingCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigin(`${position.coords.latitude},${position.coords.longitude}`);
          setIsUsingCurrentLocation(false);
        },
        (error) => {
          console.error('Error getting current location:', error);
          setIsUsingCurrentLocation(false);
        }
      );
    }
  }, [isUsingCurrentLocation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Submitting route calculation request...');
      const routeData = await calculateRoute(origin, destination, preferences);
      console.log('Route calculation successful:', routeData);
      onRouteCalculated(routeData);
    } catch (err) {
      console.error('Error calculating route:', err);
      setError('An error occurred while planning your trip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  return (
    <form onSubmit={handleSubmit} className="user-input">
      <div className="input-group">
        <div className="input-wrapper">
          <Autocomplete
            onLoad={(autocomplete) => {
              originAutocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={() => {
              const place = originAutocompleteRef.current.getPlace();
              setOrigin(place.formatted_address);
            }}
          >
            <input
              type="text"
              placeholder="Starting point"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              required
            />
          </Autocomplete>
        </div>
        <div className="button-wrapper">
          <button type="button" onClick={() => setIsUsingCurrentLocation(true)}>
            Use my location
          </button>
        </div>
      </div>
      <div className="input-wrapper">
        <Autocomplete
          onLoad={(autocomplete) => {
            destinationAutocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={() => {
            const place = destinationAutocompleteRef.current.getPlace();
            setDestination(place.formatted_address);
          }}
        >
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </Autocomplete>
      </div>
      <textarea
        placeholder="Enter your preferences (e.g., natural sights, BBQ, trails)"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Planning...' : 'Plan My Trip'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}export default UserInput;
