import React from 'react';
import Icon from '../../../components/AppIcon.jsx';

const WelcomeMessage = ({ userName = "there" }) => {
  const currentHour = new Date()?.getHours();
  let greeting = "Good evening";
  
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  }

  return (
    <div className="text-center py-8 px-4">
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="Brain" size={32} color="white" />
      </div>
      
      <h2 className="text-fluid-xl font-heading font-semibold text-foreground mb-2">
        {greeting}, {userName}!
      </h2>
      
      <p className="text-fluid-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
        I'm your AI companion, here to provide emotional support and productivity advice. How are you feeling today? What's on your mind?
      </p>
      
      <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} />
          <span>Private & Secure</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Heart" size={14} />
          <span>Empathetic AI</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Zap" size={14} />
          <span>24/7 Available</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;