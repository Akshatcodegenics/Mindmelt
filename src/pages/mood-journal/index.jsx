import React, { useState, useEffect, useCallback } from 'react';
import Header from '../../components/ui/Header';
import JournalEditor from './components/JournalEditor';
import MoodAnalysisPanel from './components/MoodAnalysisPanel';
import MoodTagSelector from './components/MoodTagSelector';
import RecentEntries from './components/RecentEntries';
import Button from '../../components/ui/Button';


const MoodJournal = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [analysisData, setAnalysisData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [entries, setEntries] = useState([]);
  const [showMobileAnalysis, setShowMobileAnalysis] = useState(false);

  // Mock journal entries data
  const mockEntries = [
    {
      id: 1,
      title: "Productive Monday",
      content: "Had a really productive day at work today. Completed the project presentation and received positive feedback from the team. Feeling accomplished and motivated for the rest of the week. The morning meditation session really helped me stay focused throughout the day.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      wordCount: 45,
      moods: ['Happy', 'Confident', 'Calm'],
      sentiment: { score: 0.8, label: 'Very Positive' }
    },
    {
      id: 2,
      title: "Stressful Deadline",
      content: "Feeling overwhelmed with the upcoming deadline. There's so much to do and not enough time. Need to prioritize tasks better and maybe ask for help from colleagues. Taking deep breaths and trying to stay calm.",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      wordCount: 38,
      moods: ['Stressed', 'Anxious', 'Overwhelmed'],
      sentiment: { score: -0.4, label: 'Negative' }
    },
    {
      id: 3,
      title: "Weekend Reflection",
      content: "Spent a wonderful weekend with family. We went hiking and had a picnic by the lake. These moments remind me of what's truly important in life. Feeling grateful for the people around me and the beautiful nature we got to enjoy.",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      wordCount: 42,
      moods: ['Grateful', 'Happy', 'Calm'],
      sentiment: { score: 0.9, label: 'Very Positive' }
    }
  ];

  useEffect(() => {
    setEntries(mockEntries);
  }, []);

  // Mock AI analysis function
  const analyzeText = useCallback((text) => {
    if (!text || text?.trim()?.length < 10) {
      setAnalysisData(null);
      return;
    }

    setIsAnalyzing(true);

    // Simulate API delay
    setTimeout(() => {
      const words = text?.toLowerCase();
      let moods = [];
      let sentimentScore = 0;
      let themes = [];

      // Simple keyword-based mood detection
      if (words?.includes('happy') || words?.includes('joy') || words?.includes('excited') || words?.includes('great')) {
        moods?.push({ emotion: 'Happy', confidence: 85 });
        sentimentScore += 0.3;
      }
      if (words?.includes('sad') || words?.includes('down') || words?.includes('depressed')) {
        moods?.push({ emotion: 'Sad', confidence: 78 });
        sentimentScore -= 0.4;
      }
      if (words?.includes('stress') || words?.includes('pressure') || words?.includes('deadline') || words?.includes('overwhelmed')) {
        moods?.push({ emotion: 'Stressed', confidence: 82 });
        sentimentScore -= 0.2;
      }
      if (words?.includes('calm') || words?.includes('peaceful') || words?.includes('relaxed') || words?.includes('meditation')) {
        moods?.push({ emotion: 'Calm', confidence: 88 });
        sentimentScore += 0.2;
      }
      if (words?.includes('anxious') || words?.includes('worried') || words?.includes('nervous')) {
        moods?.push({ emotion: 'Anxious', confidence: 75 });
        sentimentScore -= 0.3;
      }

      // Default mood if none detected
      if (moods?.length === 0) {
        moods?.push({ emotion: 'Calm', confidence: 60 });
      }

      // Extract themes
      if (words?.includes('work') || words?.includes('job') || words?.includes('project')) themes?.push('Work');
      if (words?.includes('family') || words?.includes('friends') || words?.includes('relationship')) themes?.push('Relationships');
      if (words?.includes('health') || words?.includes('exercise') || words?.includes('sleep')) themes?.push('Health');
      if (words?.includes('future') || words?.includes('goals') || words?.includes('plans')) themes?.push('Future Planning');

      // Sentiment analysis
      const sentiment = {
        score: Math.max(-1, Math.min(1, sentimentScore)),
        label: sentimentScore > 0.5 ? 'Very Positive' : 
               sentimentScore > 0.1 ? 'Positive' : 
               sentimentScore > -0.1 ? 'Neutral' : 
               sentimentScore > -0.5 ? 'Negative' : 'Very Negative'
      };

      // Generate recommendations
      let recommendations = '';
      if (sentimentScore < -0.3) {
        recommendations = "Consider taking some time for self-care activities like deep breathing, a short walk, or talking to someone you trust. Remember that difficult feelings are temporary.";
      } else if (sentimentScore > 0.3) {
        recommendations = "You're in a positive state! This is a great time to tackle challenging tasks or help others who might be struggling.";
      } else {
        recommendations = "Your emotional state seems balanced. Consider reflecting on what's working well and what you might want to adjust in your daily routine.";
      }

      setAnalysisData({
        moods,
        sentiment,
        themes,
        recommendations
      });
      setIsAnalyzing(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      analyzeText(currentEntry);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [currentEntry, analyzeText]);

  const handleEntryChange = (text) => {
    setCurrentEntry(text);
  };

  const handleMoodToggle = (mood) => {
    setSelectedMoods(prev => 
      prev?.includes(mood) 
        ? prev?.filter(m => m !== mood)
        : [...prev, mood]
    );
  };

  const handleSaveEntry = (entryData) => {
    const newEntry = {
      id: Date.now(),
      ...entryData,
      moods: selectedMoods,
      sentiment: analysisData?.sentiment || { score: 0, label: 'Neutral' }
    };

    setEntries(prev => [newEntry, ...prev]);
    setSelectedMoods([]);
    setAnalysisData(null);
    setCurrentEntry('');
    
    // Show success message (you could implement a toast notification here)
    console.log('Entry saved successfully!');
  };

  const handleEntrySelect = (entry) => {
    // Navigate to detailed view or expand entry
    console.log('Selected entry:', entry);
  };

  const handleExportPDF = () => {
    // Mock PDF export functionality
    console.log('Exporting mood report to PDF...');
    // In a real app, this would generate and download a PDF
  };

  const getSuggestedMoods = () => {
    if (!analysisData || !analysisData?.moods) return [];
    return analysisData?.moods?.map(mood => mood?.emotion);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-fluid-3xl font-heading font-semibold text-foreground mb-2">
                  Mood Journal
                </h1>
                <p className="text-muted-foreground">
                  Express your thoughts and emotions with AI-powered mood analysis
                </p>
              </div>
              
              {/* Mobile Analysis Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileAnalysis(!showMobileAnalysis)}
                  iconName={showMobileAnalysis ? "X" : "Brain"}
                  iconPosition="left"
                  iconSize={16}
                >
                  {showMobileAnalysis ? "Close" : "Analysis"}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Analysis Panel */}
          {showMobileAnalysis && (
            <div className="lg:hidden mb-6">
              <MoodAnalysisPanel 
                analysisData={analysisData}
                isAnalyzing={isAnalyzing}
              />
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Journal Editor */}
            <div className="lg:col-span-2 space-y-6">
              <JournalEditor
                onEntryChange={handleEntryChange}
                onSave={handleSaveEntry}
                isAnalyzing={isAnalyzing}
              />
              
              <MoodTagSelector
                selectedMoods={selectedMoods}
                onMoodToggle={handleMoodToggle}
                suggestedMoods={getSuggestedMoods()}
              />
            </div>

            {/* Right Column - Analysis & Recent Entries */}
            <div className="space-y-6">
              {/* Desktop Analysis Panel */}
              <div className="hidden lg:block">
                <MoodAnalysisPanel 
                  analysisData={analysisData}
                  isAnalyzing={isAnalyzing}
                />
              </div>
              
              <RecentEntries
                entries={entries}
                onEntrySelect={handleEntrySelect}
                onExportPDF={handleExportPDF}
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button
              variant="outline"
              iconName="MessageCircle"
              iconPosition="left"
              iconSize={16}
              onClick={() => window.location.href = '/ai-chat-companion'}
            >
              Talk to AI Companion
            </Button>
            
            <Button
              variant="outline"
              iconName="BarChart3"
              iconPosition="left"
              iconSize={16}
              onClick={() => window.location.href = '/dashboard'}
            >
              View Mood Trends
            </Button>
            
            <Button
              variant="outline"
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
              onClick={() => window.location.href = '/settings-and-profile'}
            >
              Journal Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MoodJournal;