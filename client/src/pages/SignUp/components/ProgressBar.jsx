import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8 md:mb-10 lg:mb-12">
      <div className="flex justify-between items-center mb-3 md:mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-cta text-sm md:text-base lg:text-lg transition-all duration-500 ${
                    isCompleted
                      ? 'bg-accent text-white shadow-lg shadow-accent/30'
                      : isCurrent
                      ? 'glass-panel-strong border-2 border-accent text-accent'
                      : 'glass-panel text-muted-foreground'
                  }`}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span
                  className={`mt-2 text-xs md:text-sm font-body transition-colors duration-300 ${
                    isCurrent ? 'text-accent font-medium' : 'text-muted-foreground'
                  }`}
                >
                  Step {stepNumber}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div className="flex-1 h-1 mx-2 md:mx-3 lg:mx-4 glass-panel overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      stepNumber < currentStep ? 'bg-accent' : 'bg-transparent'
                    }`}
                    style={{ width: stepNumber < currentStep ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="w-full h-2 glass-panel overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-accent to-accent/80 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
