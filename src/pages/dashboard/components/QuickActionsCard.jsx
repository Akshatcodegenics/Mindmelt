import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon.jsx';


const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Journal Entry',
      description: 'Record your current mood and thoughts',
      icon: 'BookOpen',
      color: 'bg-blue-500',
      action: () => navigate('/mood-journal')
    },
    {
      id: 2,
      title: 'AI Chat',
      description: 'Talk to your wellness companion',
      icon: 'MessageCircle',
      color: 'bg-green-500',
      action: () => navigate('/ai-chat-companion')
    },
    {
      id: 3,
      title: 'Breathing Exercise',
      description: 'Quick 5-minute relaxation session',
      icon: 'Wind',
      color: 'bg-purple-500',
      action: () => {}
    },
    {
      id: 4,
      title: 'Mood Check-in',
      description: 'Quick mood assessment',
      icon: 'Heart',
      color: 'bg-pink-500',
      action: () => navigate('/mood-journal')
    }
  ];

  return (
    <div className="bg-card soft-shadow-md organic-radius-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-fluid-xl font-heading font-semibold text-foreground">
          Quick Actions
        </h2>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            onClick={action?.action}
            className="group cursor-pointer bg-muted/30 hover:bg-muted/50 organic-radius-md p-4 transition-all duration-200 breathing-card border border-transparent hover:border-border"
          >
            <div className="flex items-start space-x-3">
              <div className={`${action?.color} p-2 organic-radius-md flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-fluid-base font-heading font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h3>
                <p className="text-fluid-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;