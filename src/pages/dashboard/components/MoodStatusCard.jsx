import React from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const MoodStatusCard = ({ currentMood, onJournalClick }) => {
  const moodConfig = {
    happy: {
      icon: 'Smile',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      message: 'You\'re feeling great today!'
    },
    calm: {
      icon: 'Heart',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      message: 'You\'re in a peaceful state'
    },
    stressed: {
      icon: 'Zap',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      message: 'Take a moment to breathe'
    },
    sad: {
      icon: 'CloudRain',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      message: 'It\'s okay to feel this way'
    }
  };

  const config = moodConfig?.[currentMood?.status] || moodConfig?.calm;

  return (
    <div className="bg-card soft-shadow-md organic-radius-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground">
          Current Mood
        </h2>
        <div className={`p-3 ${config?.bgColor} ${config?.borderColor} border organic-radius-md`}>
          <Icon name={config?.icon} size={24} className={config?.color} />
        </div>
      </div>
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-20 h-20 ${config?.bgColor} organic-radius-xl mb-4`}>
          <Icon name={config?.icon} size={40} className={config?.color} />
        </div>
        <h3 className="text-fluid-2xl font-heading font-semibold text-foreground capitalize mb-2">
          {currentMood?.status}
        </h3>
        <p className="text-fluid-base text-muted-foreground mb-2">
          {config?.message}
        </p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-fluid-sm text-muted-foreground">Confidence:</span>
          <div className="flex items-center space-x-1">
            <div className="w-24 h-2 bg-muted organic-radius-sm overflow-hidden">
              <div 
                className="h-full bg-primary organic-radius-sm transition-all duration-300"
                style={{ width: `${currentMood?.confidence}%` }}
              />
            </div>
            <span className="text-fluid-sm font-medium text-foreground">
              {currentMood?.confidence}%
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <Button 
          variant="default" 
          onClick={onJournalClick}
          iconName="PenTool"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          Update Mood
        </Button>
        <Button 
          variant="outline" 
          iconName="TrendingUp"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          View Trends
        </Button>
      </div>
    </div>
  );
};

export default MoodStatusCard;