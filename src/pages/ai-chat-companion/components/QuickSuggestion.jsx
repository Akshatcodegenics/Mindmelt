import React from 'react';
import Button from '../../../components/ui/Button.jsx';

const QuickSuggestions = ({ onSuggestionClick, isVisible }) => {
  const suggestions = [
    {
      id: 1,
      text: "I\'m feeling stressed about work",
      category: "stress"
    },
    {
      id: 2,
      text: "Help me stay productive today",
      category: "productivity"
    },
    {
      id: 3,
      text: "I need some motivation",
      category: "wellness"
    },
    {
      id: 4,
      text: "How can I manage anxiety?",
      category: "wellness"
    },
    {
      id: 5,
      text: "Tips for better sleep",
      category: "health"
    },
    {
      id: 6,
      text: "I\'m feeling overwhelmed",
      category: "stress"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground mb-3">Quick suggestions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestions?.map((suggestion) => (
          <Button
            key={suggestion?.id}
            variant="outline"
            size="sm"
            onClick={() => onSuggestionClick(suggestion?.text)}
            className="text-xs rounded-full micro-feedback"
          >
            {suggestion?.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;