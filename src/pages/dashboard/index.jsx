import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MoodStatusCard from './components/MoodStatusCard';
import WellnessTipsCard from './components/WellnessTipsCard';
import MoodTrendChart from './components/MoodTrendChart';
import QuickActionsCard from './components/QuickActionsCard';
import MetricsPanel from './components/MetricsPanel';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock current mood data
  const currentMood = {
    status: "calm",
    confidence: 85,
    lastUpdated: new Date(Date.now() - 3600000) // 1 hour ago
  };

  // Mock wellness tips data
  const wellnessTips = [
    {
      id: 1,
      title: "Practice Deep Breathing",
      description: "Take 5 minutes to focus on your breath. Inhale for 4 counts, hold for 4, exhale for 6. This helps activate your parasympathetic nervous system and reduce stress.",
      icon: "Wind",
      categoryColor: "bg-blue-500",
      duration: "5 minutes",
      actionStep: "Try the 4-4-6 breathing technique right now"
    },
    {
      id: 2,
      title: "Gratitude Reflection",
      description: "Write down three things you're grateful for today. Research shows that gratitude practice can improve mood and overall life satisfaction.",
      icon: "Heart",
      categoryColor: "bg-pink-500",
      duration: "3 minutes",
      actionStep: "List 3 things you appreciate about today"
    },
    {
      id: 3,
      title: "Mindful Movement",
      description: "Take a short walk or do gentle stretches. Physical movement releases endorphins and helps clear your mind, especially when feeling overwhelmed.",
      icon: "Activity",
      categoryColor: "bg-green-500",
      duration: "10 minutes",
      actionStep: "Stand up and stretch your arms and neck"
    },
    {
      id: 4,
      title: "Digital Detox Break",
      description: "Step away from screens for a few minutes. Look out a window, observe nature, or simply sit quietly to give your mind a rest from digital stimulation.",
      icon: "Smartphone",
      categoryColor: "bg-purple-500",
      duration: "5 minutes",
      actionStep: "Put your phone aside and look outside"
    }
  ];

  // Mock weekly mood trend data
  const weeklyMoodData = [
    { period: "Mon", happy: 65, calm: 75, stressed: 20, sad: 10 },
    { period: "Tue", happy: 70, calm: 80, stressed: 15, sad: 8 },
    { period: "Wed", happy: 60, calm: 70, stressed: 30, sad: 15 },
    { period: "Thu", happy: 75, calm: 85, stressed: 10, sad: 5 },
    { period: "Fri", happy: 80, calm: 90, stressed: 8, sad: 3 },
    { period: "Sat", happy: 85, calm: 95, stressed: 5, sad: 2 },
    { period: "Sun", happy: 78, calm: 88, stressed: 12, sad: 5 }
  ];

  // Mock monthly mood trend data
  const monthlyMoodData = [
    { period: "Week 1", happy: 68, calm: 78, stressed: 18, sad: 8 },
    { period: "Week 2", happy: 72, calm: 82, stressed: 15, sad: 6 },
    { period: "Week 3", happy: 75, calm: 85, stressed: 12, sad: 5 },
    { period: "Week 4", happy: 79, calm: 89, stressed: 10, sad: 4 }
  ];

  // Mock metrics data
  const metricsData = {
    currentStreak: 12,
    journalEntries: 5,
    wellnessScore: 78,
    chatSessions: 8
  };

  const handleJournalClick = () => {
    navigate('/mood-journal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <Header />
      
      <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-fluid-3xl font-heading font-bold text-foreground mb-2">
              Welcome back to MindMate
            </h1>
            <p className="text-fluid-lg text-muted-foreground">
              Here's your mental wellness overview for today, October 26th, 2025
            </p>
          </div>

          {/* Top Section - Current Mood and Wellness Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <MoodStatusCard 
              currentMood={currentMood}
              onJournalClick={handleJournalClick}
            />
            <WellnessTipsCard tips={wellnessTips} />
          </div>

          {/* Main Content - Mood Trends */}
          <div className="mb-8">
            <MoodTrendChart 
              weeklyData={weeklyMoodData}
              monthlyData={monthlyMoodData}
            />
          </div>

          {/* Bottom Section - Quick Actions and Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <QuickActionsCard />
            <MetricsPanel metrics={metricsData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;