import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const JournalEditor = ({ onEntryChange, onSave, isAnalyzing }) => {
  const [entry, setEntry] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [title, setTitle] = useState('');

  const placeholderPrompts = [
    "How are you feeling today? What emotions are you experiencing right now?",
    "What thoughts are going through your mind? Describe your current state.",
    "What happened today that affected your mood? Share your experiences.",
    "Take a moment to reflect on your feelings and write them down here.",
    "Express yourself freely. What\'s on your heart and mind today?"
  ];

  const [currentPrompt, setCurrentPrompt] = useState(placeholderPrompts?.[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrompt(prev => {
        const currentIndex = placeholderPrompts?.indexOf(prev);
        return placeholderPrompts?.[(currentIndex + 1) % placeholderPrompts?.length];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onEntryChange(entry);
  }, [entry, onEntryChange]);

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Mock voice recording functionality
    if (!isRecording) {
      setTimeout(() => {
        setEntry(prev => prev + " [Voice input: I'm feeling quite stressed about work today, but also hopeful about the weekend plans.]");
        setIsRecording(false);
      }, 3000);
    }
  };

  const handleSave = () => {
    if (entry?.trim() || title?.trim()) {
      onSave({
        title: title || `Journal Entry - ${new Date()?.toLocaleDateString()}`,
        content: entry,
        timestamp: new Date(),
        wordCount: entry?.split(' ')?.filter(word => word?.length > 0)?.length
      });
      setEntry('');
      setTitle('');
    }
  };

  const wordCount = entry?.split(' ')?.filter(word => word?.length > 0)?.length;

  return (
    <div className="bg-card rounded-organic-lg soft-shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground">
          New Journal Entry
        </h2>
        <div className="flex items-center space-x-2 text-muted-foreground text-sm">
          <Icon name="FileText" size={16} />
          <span>{wordCount} words</span>
        </div>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Give your entry a title (optional)"
          value={title}
          onChange={(e) => setTitle(e?.target?.value)}
          className="mb-4"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="relative flex-1 mb-4">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e?.target?.value)}
            placeholder={currentPrompt}
            className="w-full h-full min-h-[300px] p-4 bg-muted/30 border border-border rounded-organic-md resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
            style={{ fontFamily: 'inherit' }}
          />
          
          {isAnalyzing && (
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-primary font-medium">Analyzing...</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={handleVoiceRecord}
              iconName={isRecording ? "Square" : "Mic"}
              iconPosition="left"
              iconSize={16}
              className="micro-feedback"
            >
              {isRecording ? "Stop Recording" : "Voice Input"}
            </Button>
            
            {isRecording && (
              <div className="flex items-center space-x-2 text-destructive">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording...</span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setEntry('');
                setTitle('');
              }}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Clear
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleSave}
              disabled={!entry?.trim() && !title?.trim()}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Entry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEditor;