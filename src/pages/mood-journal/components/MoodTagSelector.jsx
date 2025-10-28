import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const MoodTagSelector = ({ selectedMoods, onMoodToggle, suggestedMoods }) => {
  const [showAll, setShowAll] = useState(false);

  const allMoods = [
    { name: 'Happy', icon: 'Smile', color: 'yellow' },
    { name: 'Sad', icon: 'Frown', color: 'blue' },
    { name: 'Stressed', icon: 'Zap', color: 'red' },
    { name: 'Calm', icon: 'Leaf', color: 'green' },
    { name: 'Anxious', icon: 'AlertCircle', color: 'orange' },
    { name: 'Excited', icon: 'Star', color: 'purple' },
    { name: 'Grateful', icon: 'Heart', color: 'pink' },
    { name: 'Frustrated', icon: 'Frown', color: 'red' },
    { name: 'Hopeful', icon: 'Sunrise', color: 'yellow' },
    { name: 'Lonely', icon: 'User', color: 'gray' },
    { name: 'Confident', icon: 'Shield', color: 'blue' },
    { name: 'Overwhelmed', icon: 'CloudRain', color: 'gray' }
  ];

  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      yellow: isSelected ? 'bg-yellow-100 border-yellow-300 text-yellow-700' : 'border-yellow-200 text-yellow-600 hover:bg-yellow-50',
      blue: isSelected ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border-blue-200 text-blue-600 hover:bg-blue-50',
      red: isSelected ? 'bg-red-100 border-red-300 text-red-700' : 'border-red-200 text-red-600 hover:bg-red-50',
      green: isSelected ? 'bg-green-100 border-green-300 text-green-700' : 'border-green-200 text-green-600 hover:bg-green-50',
      orange: isSelected ? 'bg-orange-100 border-orange-300 text-orange-700' : 'border-orange-200 text-orange-600 hover:bg-orange-50',
      purple: isSelected ? 'bg-purple-100 border-purple-300 text-purple-700' : 'border-purple-200 text-purple-600 hover:bg-purple-50',
      pink: isSelected ? 'bg-pink-100 border-pink-300 text-pink-700' : 'border-pink-200 text-pink-600 hover:bg-pink-50',
      gray: isSelected ? 'bg-gray-100 border-gray-300 text-gray-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
    };
    return colorMap?.[color] || colorMap?.gray;
  };

  const displayedMoods = showAll ? allMoods : allMoods?.slice(0, 6);

  return (
    <div className="bg-card rounded-organic-lg soft-shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-fluid-lg font-heading font-semibold text-foreground">
          Mood Tags
        </h3>
        {suggestedMoods && suggestedMoods?.length > 0 && (
          <div className="flex items-center space-x-1 text-sm text-primary">
            <Icon name="Sparkles" size={14} />
            <span>AI Suggested</span>
          </div>
        )}
      </div>
      {/* AI Suggested Moods */}
      {suggestedMoods && suggestedMoods?.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Based on your writing:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedMoods?.map((mood) => {
              const moodData = allMoods?.find(m => m?.name === mood);
              const isSelected = selectedMoods?.includes(mood);
              
              return (
                <button
                  key={mood}
                  onClick={() => onMoodToggle(mood)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full border-2 transition-all duration-200 ${
                    moodData ? getColorClasses(moodData?.color, isSelected) : 'border-gray-200 text-gray-600'
                  } ring-2 ring-primary/20`}
                >
                  <Icon name={moodData?.icon || 'Circle'} size={14} />
                  <span className="text-sm font-medium">{mood}</span>
                  <Icon name="Sparkles" size={12} className="text-primary" />
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Manual Mood Selection */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Select all that apply:</p>
        <div className="flex flex-wrap gap-2">
          {displayedMoods?.map((mood) => {
            const isSelected = selectedMoods?.includes(mood?.name);
            
            return (
              <button
                key={mood?.name}
                onClick={() => onMoodToggle(mood?.name)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full border-2 transition-all duration-200 ${
                  getColorClasses(mood?.color, isSelected)
                }`}
              >
                <Icon name={mood?.icon} size={14} />
                <span className="text-sm font-medium">{mood?.name}</span>
              </button>
            );
          })}
        </div>

        {!showAll && allMoods?.length > 6 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(true)}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
            className="mt-2"
          >
            Show {allMoods?.length - 6} more moods
          </Button>
        )}

        {showAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(false)}
            iconName="Minus"
            iconPosition="left"
            iconSize={14}
            className="mt-2"
          >
            Show less
          </Button>
        )}
      </div>
      {selectedMoods?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-2">
            Selected ({selectedMoods?.length}):
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedMoods?.map((mood) => (
              <span 
                key={mood}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
              >
                {mood}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTagSelector;