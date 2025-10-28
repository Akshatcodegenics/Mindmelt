import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlight = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Insights',
      description: 'Get personalized wellness recommendations based on your mood patterns and emotional data.'
    },
    {
      icon: 'MessageCircle',
      title: 'Emotional Support Chat',
      description: 'Connect with our AI companion for 24/7 emotional support and productivity guidance.'
    },
    {
      icon: 'TrendingUp',
      title: 'Mood Tracking',
      description: 'Visualize your emotional journey with detailed analytics and trend reports.'
    },
    {
      icon: 'Shield',
      title: 'Privacy First',
      description: 'Your mental health data is encrypted and secure with enterprise-grade protection.'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground mb-2">
          Your Mental Wellness Journey Starts Here
        </h2>
        <p className="text-fluid-sm text-muted-foreground">
          Join thousands of users who have transformed their emotional well-being with MindMate
        </p>
      </div>
      <div className="grid gap-4">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-4 bg-card/50 organic-radius-md">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-organic-md flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-fluid-sm font-medium text-foreground mb-1">
                {feature?.title}
              </h3>
              <p className="text-fluid-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center pt-4">
        <div className="flex items-center justify-center space-x-4 text-fluid-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} />
            <span>10,000+ Users</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} />
            <span>4.9 Rating</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} />
            <span>Award Winning</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlight;