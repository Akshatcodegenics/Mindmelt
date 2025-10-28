import React from 'react';
import Icon from '../../../components/AppIcon.jsx';


const MessageBubble = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Brain" size={16} color="white" />
        </div>
        <div className="bg-card border border-border rounded-organic-lg px-4 py-3 max-w-xs lg:max-w-md">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="Brain" size={16} color="white" />
        </div>
      )}
      {isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'ml-auto' : ''}`}>
        <div className={`px-4 py-3 rounded-organic-lg ${
          isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-card border border-border text-card-foreground'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <div className={`text-xs text-muted-foreground mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;