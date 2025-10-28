import React, { useState } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const WellnessTipsCard = ({ tips }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips?.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + tips?.length) % tips?.length);
  };

  const currentTip = tips?.[currentTipIndex];

  return (
    <div className="bg-card soft-shadow-md organic-radius-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground">
          AI Wellness Tips
        </h2>
        <div className="p-2 bg-accent/20 organic-radius-md">
          <Icon name="Sparkles" size={20} className="text-accent-foreground" />
        </div>
      </div>
      <div className="mb-6">
        <div className="flex items-start space-x-3 mb-4">
          <div className={`p-2 ${currentTip?.categoryColor} organic-radius-md flex-shrink-0`}>
            <Icon name={currentTip?.icon} size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-fluid-lg font-heading font-medium text-foreground mb-2">
              {currentTip?.title}
            </h3>
            <p className="text-fluid-base text-muted-foreground leading-relaxed">
              {currentTip?.description}
            </p>
          </div>
        </div>

        <div className="bg-muted/50 organic-radius-md p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-fluid-sm text-muted-foreground">
              {currentTip?.duration}
            </span>
          </div>
          <p className="text-fluid-sm text-foreground font-medium">
            {currentTip?.actionStep}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {tips?.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 organic-radius-sm transition-colors duration-200 ${
                index === currentTipIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTip}
            iconName="ChevronLeft"
            iconSize={16}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={nextTip}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default WellnessTipsCard;