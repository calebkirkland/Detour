import React, { useState, useContext } from 'react';
import { ThemeProvider, ThemeContext } from '../contexts/ThemeContext';
import Header from './Header';
import ProgressIndicator from './ProgressIndicator';
import UserInput from './UserInput';
import Map from './Map';
import SuggestionCarousel from './SuggestionCarousel';
import TripSummary from './TripSummary';
import ThemeSwitch from './ThemeSwitch';
import { calculateRoute, generateSuggestions, approveSuggestion, denySuggestion, resuggestStop, exportRoute } from '../services/api';

function AppContent() {
  const [trip, setTrip] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [currentStep, setCurrentStep] = useState('input');
  const { theme } = useContext(ThemeContext);

  const handleRouteCalculation = async (origin, destination, preferences) => {
    try {
      const routeData = await calculateRoute(origin, destination, preferences);
      setTrip(routeData);
      setCurrentStep('suggestions');
      const suggestionsData = await generateSuggestions(routeData.tripId, origin);
      setSuggestions(suggestionsData.suggestions);
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  const handleApproveSuggestion = async (suggestion) => {
    try {
      await approveSuggestion(trip.tripId, suggestion);
      setTrip(prevTrip => ({
        ...prevTrip,
        approvedStops: [...prevTrip.approvedStops, suggestion]
      }));
      setSuggestions(prevSuggestions => prevSuggestions.filter(s => s.id !== suggestion.id));
    } catch (error) {
      console.error('Error approving suggestion:', error);
    }
  };

  const handleDenySuggestion = async (suggestion) => {
    try {
      await denySuggestion(trip.tripId, suggestion);
      setSuggestions(prevSuggestions => prevSuggestions.filter(s => s.id !== suggestion.id));
    } catch (error) {
      console.error('Error denying suggestion:', error);
    }
  };

  const handleResuggest = async () => {
    try {
      const newSuggestion = await resuggestStop(trip.tripId, trip.route.origin);
      setSuggestions(prevSuggestions => [...prevSuggestions, newSuggestion]);
    } catch (error) {
      console.error('Error resuggestin stop:', error);
    }
  };

  const handleExportRoute = async () => {
    try {
      const exportedRouteUrl = await exportRoute(trip.tripId);
      window.open(exportedRouteUrl, '_blank');
    } catch (error) {
      console.error('Error exporting route:', error);
    }
  };

  return (
    <div className={`App ${theme}`}>
      <ThemeSwitch />
      <Header />
      <ProgressIndicator currentStep={currentStep} />
      {currentStep === 'input' && (
        <UserInput onSubmit={handleRouteCalculation} />
      )}
      {currentStep === 'suggestions' && (
        <>
          <Map route={trip.route} approvedStops={trip.approvedStops} />
          <SuggestionCarousel
            suggestions={suggestions}
            onApprove={handleApproveSuggestion}
            onDeny={handleDenySuggestion}
            onResuggest={handleResuggest}
          />
          <TripSummary
            trip={trip}
            onExport={handleExportRoute}
          />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
