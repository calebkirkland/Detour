import React from 'react';
import { GoogleMap, LoadScript, Polyline, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

function Map({ route, approvedStops }) {
  const center = route ? route.legs[0].start_location : { lat: 0, lng: 0 };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={8}
      >
        {route && (
          <Polyline
            path={route.overview_path}
            options={{ strokeColor: "#FF0000" }}
          />
        )}
        {approvedStops.map((stop, index) => (
          <Marker
            key={index}
            position={stop.location}
            label={`${index + 1}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
