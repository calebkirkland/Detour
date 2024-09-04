import React from 'react';

function ProgressIndicator({ currentStep }) {
  // Update these strings to have the first letter capitalized
  const steps = ['Input', 'Route Calculation', 'Suggestions', 'Finalization'];
  
  return (
    <div className="progress-indicator">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`step ${currentStep === step.toLowerCase() ? 'active' : ''} ${steps.indexOf(currentStep.toLowerCase()) > index ? 'completed' : ''}`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}

export default ProgressIndicator;

