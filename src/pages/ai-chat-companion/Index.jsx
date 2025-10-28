import React, { useState, useEffect, useRef } from 'react';
import Header from '../../components/ui/Header';
import MessageBubble from './components/MessageBubble.jsx';
import QuickSuggestions from './components/QuickSuggestion.jsx';
import ChatInput from './components/ChatInput.jsx';
import ConversationHistory from './components/ConversationHistory.jsx';
import WelcomeMessage from './components/WelcomeMessage.jsx';
import Icon from '../../components/AppIcon.jsx';
import Button from '../../components/ui/Button.jsx';

const AIChatCompanion = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentConversationId, setCurrentConversationId] = useState('current');
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock conversation history
  const [conversations] = useState([
    {
      id: 'conv-1',
      title: 'Stress Management Discussion',
      lastMessage: 'Thank you for the breathing exercises, they really helped!',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      messageCount: 12
    },
    {
      id: 'conv-2',
      title: 'Productivity Tips Session',
      lastMessage: 'The Pomodoro technique sounds perfect for my workflow.',
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      messageCount: 8
    },
    {
      id: 'conv-3',
      title: 'Anxiety Support Chat',
      lastMessage: 'I feel much calmer after our conversation.',
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      messageCount: 15
    },
    {
      id: 'conv-4',
      title: 'Morning Motivation',
      lastMessage: 'Those affirmations were exactly what I needed to hear.',
      timestamp: new Date(Date.now() - 604800000), // 1 week ago
      messageCount: 6
    }
  ]);

  // Mock AI responses based on user input
  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    if (lowerMessage?.includes('stress') || lowerMessage?.includes('overwhelmed')) {
      return `I understand you're feeling stressed. That's completely normal, and I'm here to help. Here are some immediate techniques you can try:\n\n• Take 5 deep breaths: Inhale for 4 counts, hold for 4, exhale for 6\n• Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n• Remember: This feeling is temporary and you have the strength to get through it\n\nWhat specific situation is causing you stress right now?`;
    }
    
    if (lowerMessage?.includes('productive') || lowerMessage?.includes('focus')) {
      return `Great question about productivity! Based on research and what works for many people, here are some effective strategies:\n\n• Use the Pomodoro Technique: 25 minutes focused work, 5-minute break\n• Prioritize with the Eisenhower Matrix: Important vs Urgent tasks\n• Start with your most challenging task when your energy is highest\n• Eliminate distractions: Put your phone in another room\n\nWhat type of work are you trying to focus on today?`;
    }
    
    if (lowerMessage?.includes('anxious') || lowerMessage?.includes('anxiety')) {
      return `I hear that you're experiencing anxiety, and I want you to know that what you're feeling is valid. Anxiety is your mind's way of trying to protect you, even when there's no immediate danger.\n\nHere are some gentle techniques that might help:\n\n• Box breathing: 4 counts in, 4 hold, 4 out, 4 hold\n• Progressive muscle relaxation: Tense and release each muscle group\n• Mindful observation: Focus on one object and describe it in detail\n\nRemember: You are safe right now. Would you like to talk about what's triggering these feelings?`;
    }
    
    if (lowerMessage?.includes('motivation') || lowerMessage?.includes('motivated')) {
      return `I love that you're seeking motivation! That shows real self-awareness and commitment to growth. Here's what I want you to remember:\n\n• You've overcome challenges before, and you can do it again\n• Progress isn't always linear - small steps count\n• Your future self will thank you for the effort you put in today\n• You don't have to be perfect, you just have to start\n\nWhat's one small action you could take right now toward your goal?`;
    }
    
    if (lowerMessage?.includes('sleep') || lowerMessage?.includes('tired')) {
      return `Sleep is so important for both mental and physical health. Here are some evidence-based tips for better sleep:\n\n• Create a consistent bedtime routine\n• Avoid screens 1 hour before bed\n• Keep your bedroom cool (65-68°F) and dark\n• Try the 4-7-8 breathing technique before sleep\n• Limit caffeine after 2 PM\n\nWhat's your current bedtime routine like? Are there any specific sleep challenges you're facing?`;
    }
    
    // Default supportive response
    return `Thank you for sharing that with me. I'm here to listen and support you. Everyone's journey is unique, and it's okay to have ups and downs.\n\nRemember:\n• Your feelings are valid\n• You're not alone in this\n• Small steps forward are still progress\n• It's okay to ask for help\n\nIs there anything specific you'd like to explore or talk about right now? I'm here for you.`;
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText) => {
    if (!messageText?.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setShowSuggestions(false);
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleSuggestionClick = (suggestionText) => {
    handleSendMessage(suggestionText);
  };

  const handleVoiceInput = (voiceText) => {
    handleSendMessage(voiceText);
  };

  const handleSelectConversation = (conversationId) => {
    setCurrentConversationId(conversationId);
    // In a real app, this would load the conversation messages
    if (conversationId !== 'current') {
      // Mock loading previous conversation
      setMessages([
        {
          id: 1,
          text: "Hello! I see you're returning to a previous conversation. How can I help you today?",
          isUser: false,
          timestamp: new Date()
        }
      ]);
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setCurrentConversationId('current');
    setShowSuggestions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-fluid-2xl font-heading font-semibold text-foreground mb-2">
                AI Chat Companion
              </h1>
              <p className="text-fluid-sm text-muted-foreground">
                Your personal emotional support and productivity assistant
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={startNewConversation}
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              className="hidden sm:flex"
            >
              New Chat
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Conversation History - Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <ConversationHistory
                  conversations={conversations}
                  onSelectConversation={handleSelectConversation}
                  currentConversationId={currentConversationId}
                />
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-organic-xl soft-shadow-md">
                {/* Mobile Conversation History */}
                <div className="lg:hidden p-4 border-b border-border">
                  <ConversationHistory
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    currentConversationId={currentConversationId}
                  />
                </div>

                {/* Chat Messages Area */}
                <div 
                  ref={chatContainerRef}
                  className="h-96 sm:h-[500px] lg:h-[600px] overflow-y-auto p-4 sm:p-6"
                >
                  {messages?.length === 0 ? (
                    <WelcomeMessage userName="Alex" />
                  ) : (
                    <div className="space-y-4">
                      {messages?.map((message) => (
                        <MessageBubble
                          key={message?.id}
                          message={message?.text}
                          isUser={message?.isUser}
                          timestamp={message?.timestamp}
                        />
                      ))}
                      
                      {isTyping && (
                        <MessageBubble
                          message=""
                          isUser={false}
                          isTyping={true}
                          timestamp={new Date()}
                        />
                      )}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input Area */}
                <div className="border-t border-border p-4 sm:p-6">
                  {showSuggestions && messages?.length === 0 && (
                    <QuickSuggestions
                      onSuggestionClick={handleSuggestionClick}
                      isVisible={true}
                    />
                  )}
                  
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                    onVoiceInput={handleVoiceInput}
                  />
                  
                  {/* Mobile New Chat Button */}
                  <div className="flex justify-center mt-4 sm:hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={startNewConversation}
                      iconName="Plus"
                      iconPosition="left"
                      iconSize={14}
                    >
                      New Chat
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Features Info */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-organic-lg p-4 text-center">
                  <Icon name="Shield" size={20} className="mx-auto text-primary mb-2" />
                  <h3 className="text-sm font-medium text-foreground mb-1">Private & Secure</h3>
                  <p className="text-xs text-muted-foreground">Your conversations are confidential</p>
                </div>
                
                <div className="bg-card border border-border rounded-organic-lg p-4 text-center">
                  <Icon name="Brain" size={20} className="mx-auto text-secondary mb-2" />
                  <h3 className="text-sm font-medium text-foreground mb-1">AI-Powered</h3>
                  <p className="text-xs text-muted-foreground">Contextual emotional support</p>
                </div>
                
                <div className="bg-card border border-border rounded-organic-lg p-4 text-center">
                  <Icon name="Clock" size={20} className="mx-auto text-accent mb-2" />
                  <h3 className="text-sm font-medium text-foreground mb-1">24/7 Available</h3>
                  <p className="text-xs text-muted-foreground">Always here when you need support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatCompanion;