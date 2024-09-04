import React from 'react';

function SuggestionCarousel({ suggestions, onApprove, onDeny, onResuggest }) {
  return (
    <div className="suggestion-carousel">
      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="suggestion-card">
          <img src={suggestion.image} alt={suggestion.name} />
          <h3>{suggestion.name}</h3>
          <p>{suggestion.description}</p>
          <div className="suggestion-actions">
            <button onClick={() => onApprove(suggestion)}>Approve</button>
            <button onClick={() => onDeny(suggestion)}>Deny</button>
          </div>
        </div>
      ))}
      <button onClick={onResuggest} className="resuggest-button">Get New Suggestion</button>
    </div>
  );
}

export default SuggestionCarousel;
