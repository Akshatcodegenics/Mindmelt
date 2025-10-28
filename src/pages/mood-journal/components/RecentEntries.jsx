import React, { useState } from 'react';
import Button from '../../../components/ui/Button.jsx';
import Icon from '../../../components/AppIcon.jsx';

const RecentEntries = ({ entries, onEntrySelect, onExportPDF }) => {
  const [expandedEntry, setExpandedEntry] = useState(null);

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMoodColor = (mood) => {
    const colors = {
      Happy: 'text-yellow-600 bg-yellow-50',
      Sad: 'text-blue-600 bg-blue-50',
      Stressed: 'text-red-600 bg-red-50',
      Calm: 'text-green-600 bg-green-50',
      Anxious: 'text-orange-600 bg-orange-50',
      Excited: 'text-purple-600 bg-purple-50'
    };
    return colors?.[mood] || 'text-gray-600 bg-gray-50';
  };

  const truncateText = (text, maxLength = 100) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card rounded-organic-lg soft-shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-fluid-lg font-heading font-semibold text-foreground">
          Recent Entries
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onExportPDF}
            iconName="Download"
            iconPosition="left"
            iconSize={14}
          >
            Export PDF
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4">
        {entries?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No entries yet</p>
            <p className="text-sm text-muted-foreground">
              Start journaling to see your entries here
            </p>
          </div>
        ) : (
          entries?.map((entry) => (
            <div
              key={entry?.id}
              className="border border-border rounded-organic-md p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onEntrySelect(entry)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1 line-clamp-1">
                    {entry?.title}
                  </h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(entry?.timestamp)}</span>
                    <span>•</span>
                    <span>{entry?.wordCount} words</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e?.stopPropagation();
                    setExpandedEntry(expandedEntry === entry?.id ? null : entry?.id);
                  }}
                  iconName={expandedEntry === entry?.id ? "ChevronUp" : "ChevronDown"}
                  iconSize={16}
                />
              </div>

              {/* Mood Tags */}
              {entry?.moods && entry?.moods?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {entry?.moods?.slice(0, 3)?.map((mood, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(mood)}`}
                    >
                      {mood}
                    </span>
                  ))}
                  {entry?.moods?.length > 3 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-50">
                      +{entry?.moods?.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Content Preview */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {expandedEntry === entry?.id ? entry?.content : truncateText(entry?.content)}
              </p>

              {/* Sentiment Score */}
              {entry?.sentiment && (
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={entry?.sentiment?.score > 0 ? "TrendingUp" : entry?.sentiment?.score < 0 ? "TrendingDown" : "Minus"} 
                      size={14} 
                      className={entry?.sentiment?.score > 0 ? "text-green-600" : entry?.sentiment?.score < 0 ? "text-red-600" : "text-gray-600"}
                    />
                    <span className="text-xs text-muted-foreground">
                      {entry?.sentiment?.label}
                    </span>
                  </div>
                  <span className={`text-xs font-medium ${entry?.sentiment?.score > 0 ? "text-green-600" : entry?.sentiment?.score < 0 ? "text-red-600" : "text-gray-600"}`}>
                    {entry?.sentiment?.score > 0 ? '+' : ''}{entry?.sentiment?.score?.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      {entries?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Archive"
            iconPosition="left"
            iconSize={14}
          >
            View All Entries ({entries?.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentEntries;