import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const MoodAnalysisPanel = ({ analysisData, isAnalyzing }) => {
  const moodColors = {
    Happy: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    Sad: 'text-blue-600 bg-blue-50 border-blue-200',
    Stressed: 'text-red-600 bg-red-50 border-red-200',
    Calm: 'text-green-600 bg-green-50 border-green-200',
    Anxious: 'text-orange-600 bg-orange-50 border-orange-200',
    Excited: 'text-purple-600 bg-purple-50 border-purple-200'
  };

  const moodIcons = {
    Happy: 'Smile',
    Sad: 'Frown',
    Stressed: 'Zap',
    Calm: 'Leaf',
    Anxious: 'AlertCircle',
    Excited: 'Star'
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600 bg-green-100';
    if (confidence >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-card rounded-organic-lg soft-shadow-md p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-fluid-lg font-heading font-semibold text-foreground">
          AI Mood Analysis
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">Real-time</span>
        </div>
      </div>
      {isAnalyzing ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground text-center">
            Analyzing your emotional state...
          </p>
        </div>
      ) : analysisData ? (
        <div className="space-y-6">
          {/* Primary Mood */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Detected Emotions</h4>
            
            {analysisData?.moods?.map((mood, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full border ${moodColors?.[mood?.emotion] || 'text-gray-600 bg-gray-50 border-gray-200'}`}>
                      <Icon 
                        name={moodIcons?.[mood?.emotion] || 'Circle'} 
                        size={16} 
                      />
                    </div>
                    <span className="font-medium text-foreground">{mood?.emotion}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(mood?.confidence)}`}>
                    {mood?.confidence}%
                  </div>
                </div>
                
                <div className="ml-11">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${mood?.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sentiment Score */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Overall Sentiment</h4>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-organic-md">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={analysisData?.sentiment?.score > 0 ? "TrendingUp" : analysisData?.sentiment?.score < 0 ? "TrendingDown" : "Minus"} 
                  size={20} 
                  className={analysisData?.sentiment?.score > 0 ? "text-green-600" : analysisData?.sentiment?.score < 0 ? "text-red-600" : "text-gray-600"}
                />
                <span className="font-medium text-foreground">
                  {analysisData?.sentiment?.label}
                </span>
              </div>
              <span className={`font-bold ${analysisData?.sentiment?.score > 0 ? "text-green-600" : analysisData?.sentiment?.score < 0 ? "text-red-600" : "text-gray-600"}`}>
                {analysisData?.sentiment?.score > 0 ? '+' : ''}{analysisData?.sentiment?.score?.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Key Themes */}
          {analysisData?.themes && analysisData?.themes?.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Key Themes</h4>
              <div className="flex flex-wrap gap-2">
                {analysisData?.themes?.map((theme, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {analysisData?.recommendations && (
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">AI Suggestions</h4>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-organic-md">
                <p className="text-sm text-foreground leading-relaxed">
                  {analysisData?.recommendations}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="PenTool" size={48} className="text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">Start writing to see analysis</p>
          <p className="text-sm text-muted-foreground">
            Your emotions will be analyzed in real-time as you type
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodAnalysisPanel;